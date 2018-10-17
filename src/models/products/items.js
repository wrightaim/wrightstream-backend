const knex = require('../../../db')

function getAllItems(shop_id) {
  return knex('items').where({shop_id: shop_id, archived: false})
  .then(items => {
    const promises = items.map(item => {
      return knex('items_supplies')
      .join('supplies', 'supplies.id', 'items_supplies.supplies_id')
      .where('items_supplies.item_id', item.id)
      .then(supply => {
        item.supplies = supply
        return item
      })
    })
    return Promise.all(promises)
  })
}

function getAllArchivedItems(shop_id) {
  return knex('items').where({shop_id: shop_id, archived: true}).then(items => {
    const promises = items.map(item => {
      return knex('items_supplies')
      .join('supplies', 'supplies.id', 'items_supplies.supplies_id')
      .where('items_supplies.item_id', item.id)
      .then(supply => {
        item.supplies = supply
        return item
      })
    })
    return Promise.all(promises)
  })
}

function getOneItem(item_id) {
  return knex('items').where({id: item_id, archived: false}).first()
}

function createItems(shop_id, body) {
  let stock = body.stock_qty || 0
  let category_id = body.category_id || null
  let product_id = body.product_id || null
  let image = body.image || null
  return (knex('items').insert({
    name: body.name,
    stock_qty: stock,
    steps: body.steps,
    shop_id: shop_id,
    category_id: category_id,
    product_id: product_id,
    image: image
  }).returning('*')).then(item => {
    if (body.supplies) {
      const suppliesArray = body.supplies
      const suppliesPromise = suppliesArray.map(supply => {
        return (knex('items_supplies').insert({supply_qty: supply.supply_qty, measure_unit: supply.measure_unit, item_id: item[0].id, supplies_id: supply.id}).returning('*'))
      })
      return Promise.all(suppliesPromise)
    }
    return item
  })
}

function updateItems(item_id, product_id, category_id, name, image, stock_qty, archived, steps, supplies) {
  const toUpdate = {}
  name
    ? toUpdate.name = name
    : null
  category_id || category_id === null
    ? toUpdate.category_id = category_id
    : null
  product_id || product_id === null
    ? toUpdate.product_id = product_id
    : null
  steps
    ? toUpdate.steps = steps
    : null
  image
    ? toUpdate.image = image
    : null
  archived || archived === false
    ? toUpdate.archived = archived
    : null
  stock_qty || stock_qty === 0
    ? toUpdate.stock_qty = stock_qty
    : null
  return (knex('items').update(toUpdate).where({id: item_id}).returning('*')).then(data => {
    if (supplies) {
      return (knex('items_supplies').where({item_id: item_id}).del()).then(newdata => {
        const suppliesPromise = supplies.map(supply => {
          return (knex('items_supplies').insert({supply_qty: supply.qty, measure_unit: supply.measure_unit, item_id: data[0].id, supplies_id: supply.id}).returning('*'))
        })
        return Promise.all(suppliesPromise)
      })
    }
    return data
  })
}

module.exports = {
  getOneItem,
  getAllItems,
  getAllArchivedItems,
  createItems,
  updateItems
}
