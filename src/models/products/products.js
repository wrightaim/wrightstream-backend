const knex = require('../../../db')

function getAllProducts(shop_id) {
  return (knex('products')
  .innerJoin('stores', 'stores.id', 'products.store_id')
  .select('stores.id as store_id', 'stores.name', 'listing_id', 'quantity', 'image', 'title', 'shops_id as shop_id', 'products.id as product_id')
  .where({shops_id: shopId}))
}

function getAllUnlinked(shopId) {
  return (knex('products').innerJoin('stores', 'stores.id', 'products.store_id').select('stores.id as store_id', 'stores.name', 'listing_id', 'quantity', 'image', 'title', 'shops_id as shop_id', 'products.id as product_id').where({shops_id: shopId})).then(products => {
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
