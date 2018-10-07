const knex = require('../../../db')

function getAllProducts(shop_id) {
  return (knex('stores')
  .innerJoin('products', 'stores.id', 'products.store_id')
  .innerJoin('platforms', 'stores.platform_id', 'platforms.id')
  .select('stores.id as store_id', 'platforms.name', 'listing_id', 'product_qty', 'image', 'title', 'shop_id', 'products.id as product_id')
  .where({shop_id: shop_id}))
}


function getAllUnlinked(shop_id) {
  return (knex('stores')
  .innerJoin('products', 'stores.id', 'products.store_id')
  .innerJoin('platforms', 'stores.platform_id', 'platforms.id')
  .select('stores.id as store_id', 'platforms.name', 'listing_id', 'product_qty', 'image', 'title', 'shop_id', 'products.id as product_id')
  .where({shop_id: shop_id}))
  .then(products => {
    const promise = products.map(product => {
      return knex('items').where({product_id: product.product_id}).then(items => {
        product.item = items
        return product
      }).then(bundles => {
        return knex('bundles').where({product_id: product.product_id}).then(bundles => {
          product.bundles = bundles
          return product
        })
      })
    })
    return Promise.all(promise)
  })
  .then(allProducts => {
    const unlinked = allProducts.filter(unverifiedProduct => {
      return unverifiedProduct.item.length < 1 && unverifiedProduct.bundles.length < 1
    })
    return unlinked
  })
}

module.exports = {
  getAllUnlinked,
  getAllProducts
}
