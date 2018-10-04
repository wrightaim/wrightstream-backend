const knex = require('../../../db')

function getAllBundles(shop_id) {
  return knex('bundles').where({shop_id: shop_id, archived: false})
  .then(bundles => {
    const promises = bundles.map(bundle => {
      return knex('bundles_items')
      .join('items', 'items.id', 'bundles_items.item_id')
      .where('bundles_items.bundle_id', bundle.id)
      .then(item => {
        bundle.items = item
        return bundle
      })
    })
    return Promise.all(promises)
  })
}

function getOneBundle(bundle_id) {
  return knex('bundles').where({id: bundle_id, archived: false}).first()
}

function getAllArchivedBundles(shop_id) {
  return knex('bundles').where({shop_id: shop_id, archived: true}).then(bundles => {
    const promises = bundles.map(bundle => {
      return knex('bundles_items').join('items', 'items.id', 'bundles_items.item_id').where('bundles_items.bundles_id', bundle.id).then(item => {
        bundle.items = item
        return bundle
      })
    })
    return Promise.all(promises)
  })
}

function createBundles(shop_id, body) {
  let stock = body.stock_qty || 0
  let category_id = body.category_id || null
  let product_id = body.product_id || null
  let image = body.image || null
  return (knex('bundles').insert({
    name: body.name,
    stock_qty: stock,
    steps: body.steps,
    shop_id: shop_id,
    category_id: category_id,
    product_id: product_id,
    image: image
  }).returning('*')).then(bundle => {
    if (body.items) {
      const itemsArray = body.items
      const itemsPromise = itemsArray.map(item => {
        return (knex('bundles_items').insert({item_qty: item.item_qty, bundle_id: bundle[0].id, item_id: item.id}).returning('*'))
      })
      return Promise.all(itemsPromise)
    }
    return bundle
  })
}

function updateBundles(bundle_id, product_id, category_id, name, image, stock_qty, archived, steps, items) {
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
  return (knex('bundles').update(toUpdate).where({id: bundle_id}).returning('*')).then(data => {
    if (items) {
      return (knex('bundles_items').where({bundle_id: bundle_id}).del()).then(newdata => {
        const itemsPromise = items.map(item => {
          return (knex('bundles_items').insert({item_qty: item.item_qty, bundle_id: data[0].id, item_id: item.id}).returning('*'))
        })
        return Promise.all(itemsPromise)
      })
    }
    return data
  })
}

module.exports = {
  getOneBundle,
  getAllArchivedBundles,
  getAllBundles,
  createBundles,
  updateBundles
}
