const knex = require('../../../db')

function getOneSupply(supply_id) {
  return (knex('supplies').where({id: supply_id}).first())
}

function getAllSupplies(shop_id) {
  return (knex('supplies').where({shop_id: shop_id}))
}

function createSupplies(shop_id, body) {
  let stock = body.stock || 0
  let source = body.source_id || null
  let kind = body.kind_id || null
  return (knex('supplies').insert({
    shop_id: shop_id,
    source_id: source,
    kind_id: kind,
    name: body.name,
    stock_qty: stock,
    measure_unit: body.measure_unit,
    measure_type: body.measure_type
  }).returning('*'))
}

function updateSupplies(supply_id, name, stock_qty, measure_type, measure_unit, source_id, kind_id, archived) {
  const toUpdate = {}
  name
    ? toUpdate.name = name
    : null
  stock_qty
    ? toUpdate.stock_qty = stock_qty
    : null
  measure_type
    ? toUpdate.measure_type = measure_type
    : null
  source_id
    ? toUpdate.source_id = source_id
    : null
  kind_id
    ? toUpdate.kind_id = kind_id
    : null
  stock_qty || stock_qty === 0
    ? toUpdate.stock_qty = stock_qty
    : null
  archived || archived === false
    ? toUpdate.archived = archived
    : null
  return (knex('supplies').update(toUpdate).where({id: supply_id}).returning('*'))
}

module.exports = {
  getOneSupply,
  getAllSupplies,
  createSupplies,
  updateSupplies
}
