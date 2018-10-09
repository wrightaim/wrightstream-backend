const knex = require('../../../db')

function getAllInventorySupplies(shop_id) {
  return knex('supplies')
  .join('kinds', 'kinds.id', 'supplies.kind_id')
  .select('supplies.name', 'stock_qty', 'kind_id', 'measure_unit', 'measure_type', 'supplies.id')
  .where({'supplies.shop_id': shop_id})
}

function getAllInventoryProducts(shop_id) {
  let productData = {}
  return knex('items')
  .select('items.name', 'items.stock_qty', 'items.id')
  .where({'items.shop_id': shop_id})
  .then(items => {
    productData.items = items
    return knex('bundles')
    .select('bundles.name', 'bundles.stock_qty', 'bundles.id')
    .where({'bundles.shop_id': shop_id})
  }).then(bundles => {
    productData.bundles = bundles
    return productData
  })
}

module.exports = {
  getAllInventorySupplies,
  getAllInventoryProducts
}
