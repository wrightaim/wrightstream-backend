const knex = require('../../../db')
const helperModel = require('../../models/helper/measurement')
const convert = require('convert-units')

function getAllOrders(shop_id) {
  return knex('orders').where({shop_id: shop_id}).then(orders => {
    const promises = orders.map(order => {
      return knex('orders_supplies')
      .join('supplies', 'supplies.id', 'orders_supplies.supply_id')
      .select('orders_supplies.supply_id', 'orders_supplies.supply_qty', 'orders_supplies.measure_unit', 'orders_supplies.supply_status_id', 'supplies.source_id', 'supplies.name')
      .orderBy('supplies.source_id', 'asc')
      .where('orders_supplies.order_id', order.id)
      .then(supplies => {
        supplies.map(supply => {
          supply.supply_qty = Number(supply.supply_qty)
        })
        order.supplies = supplies
        return order
      })
    })
    return Promise.all(promises)
  })
}

function getOneOrder(shop_id) {
  return knex('orders').where({id: shop_id}).then(orders => {
    const promises = orders.map(order => {
      return knex('orders_supplies')
      .join('supplies', 'supplies.id', 'orders_supplies.supply_id')
      .select('orders_supplies.supply_id', 'orders_supplies.supply_qty', 'orders_supplies.measure_unit', 'orders_supplies.supply_status_id', 'supplies.source_id')
      .orderBy('supplies.source_id', 'asc')
      .where('orders_supplies.order_id', order.id)
      .then(supplies => {
        order.supplies = supplies
        return order
      })
    })
    return Promise.all(promises)
  })
}

function createOrder(shop_id, body) {
  return knex('orders').insert({shop_id: shop_id}).returning('*')
  .then(order => {
    if (body.order) {
      return helperModel.orderPredictor(shop_id, body.order)
      .then(details => {
        const detailMap = details.map(ele => {
          return (knex('orders_supplies').insert({order_id: order[0].id, supply_id: ele.supply_id, supply_qty: ele.supply_qty, measure_unit: ele.supply_measure_type}).returning('*'))
        })
        return Promise.all(detailMap)
      })
    } else
      return order
  })
}

function updateOrder(order_id, body) {
  const toUpdate = {}
  body.order_status_id
    ? toUpdate.order_status_id = body.order_status_id
    : null
  return (knex('orders').update(toUpdate).where({id: order_id}).returning('*'))
}

function updateOrderSupply(order_id, body) {
  const toUpdate = {}
  body.supply_qty || body.supply_qty === 0
    ? toUpdate.supply_qty = body.supply_qty
    : null
  body.measure_unit
    ? toUpdate.measure_unit = body.measure_unit
    : null
  body.supply_status_id
    ? toUpdate.supply_status_id = body.supply_status_id
    : null
  return (knex('orders_supplies').update(toUpdate).where({order_id: order_id, supply_id: body.supply_id}).returning('*'))
  .catch(err => {
    return err
  }).then(supply => {
    if (supply[0].supply_status === 3) {
      return addInventory(supply)
    } else
      return supply
  })
}


//////////////////////////////////////////////////////////////////////////////////////
////////MIDDLEWARE
///////////////////////////////////////////////////////////////////////////////////////
function addInventory(newSupply) {
  const newUpdate = {}
  return (knex('supplies').where({id: newSupply[0].supply_id}).returning('*'))
  .then(supply => {
    let newSuppliesNeeded;
    let currentSupply;
    if (supply[0].stock_qty > 0) {
      if (supply[0].measure_type === newSupply[0].supply_measure_type) {
        newUpdate.stock_qty = parseInt(newSupply[0].supply_qty) + parseInt(supply[0].stock_qty)
      } else {
        let newSupplyMeasure = convert().describe(newSupply[0].measure_unit)
        let newSupplyType;

        if (newSupplyMeasure.measure === 'volume') {
          newSuppliesNeeded = convert(newSupply[0].supply_qty).from(newSupply[0].supply_measure_type).to('tsp')
          newSupplyType = 'tsp'
        }
        if (newSupplyMeasure.measure === 'length') {
          newSuppliesNeeded = convert(newSupply[0].supply_qty).from(newSupply[0].supply_measure_type).to('ft')
          newSupplyType = 'ft'
        }

        if (newSupplyMeasure.measure === 'mass') {
          newSuppliesNeeded = convert(newSupply[0].supply_qty).from(newSupply[0].supply_measure_type).to('oz')
          newSupplyType = 'oz'
        }

        if (supply[0].measure_type === 'volume') {
          currentSupply = convert(supply[0].stock_qty).from(supply[0].measure_unit).to('tsp')
          newSupplyType = 'tsp'
        }
        if (supply[0].measure_type === 'length') {
          currentSupply = convert(supply[0].stock_qty).from(supply[0].measure_unit).to('ft')
          newSupplyType = 'ft'
        }

        if (supply[0].measure_type === 'mass') {
          currentSupply = convert(supply[0].stock_qty).from(supply[0].measure_unit).to('oz')
          newSupplyType = 'oz'
        }

        newUpdate.stock_qty = Number(currentSupply) + Number(newSuppliesNeeded)
        newUpdate.measure_unit = newSupplyType
      }
    } else {
      newUpdate.stock_qty = newSupply[0].supply_qty
      newUpdate.measure_unit = newSupply[0].measure_unit
    }
    return newUpdate
  }).then(measurements => {
    return (knex('supplies').update(newUpdate)
    .where({id: newSupply[0].supply_id})
    .returning('*'))
  })
}

module.exports = {
  getOneOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  updateOrderSupply
}
