const knex = require('../../../db')

function getAllLists(shop_id) {
  return knex('lists').where({shop_id: shop_id}).then(lists => {
    const promises = lists.map(list => {
      return knex('lists_items').join('items', 'items.id', 'lists_items.item_id')
      .select('lists_items.item_id', 'lists_items.item_qty', 'items.name')
      .where('lists_items.list_id', list.id)
      .then(items => {
        list.item = items
        return list
      }).then(list => {
        return knex('lists_bundles')
        .join('bundles', 'bundles.id', 'lists_bundles.bundle_id')
        .select('lists_bundles.bundle_id', 'lists_bundles.bundle_qty', 'bundles.name')
        .where('lists_bundles.list_id', list.id)
        .then(bundles => {
          list.bundles = bundles
          return list
        })
      })
    })
    return Promise.all(promises)
  })
}

function getOneList(list_id) {
  return knex('lists').where({id: list_id}).first()
}

function createList(shop_id, body) {
  return (knex('lists').insert({name: body.name, shop_id: shop_id}).returning('*'))
  .then(lists => {
    if (body.items) {
      const itemArray = body.items
      const itemPromise = itemArray.map(ele => {
        return (knex('lists_items')
        .insert({list_id: lists[0].id, item_id: ele.item_id, item_qty: ele.item_qty})
        .returning('*'))
      })
      return Promise.all(itemPromise)
    } else {
      return lists
    }
  }).then(data => {
    if (body.bundles) {
      const bundleArray = body.bundles
      const bundlePromise = bundleArray.map(element => {
        return (knex('lists_bundles').insert({list_id: data[0][0].list_id,
          bundle_id: element.bundle_id,
          bundle_qty: element.bundle_qty
        }).returning('*'))
      })
      return Promise.all(bundlePromise)
    } else {
      return data
    }
  })
}

function removeList(list_id) {
  return (knex('lists_items')
  .where({list_id: list_id})
  .del())
  .then(lists => {
    return knex('lists_bundles')
    .where({list_id: list_id})
    .del()
  })
  .then(data => {
    return (knex('lists').where({id: list_id}).del())
  })
}

module.exports = {
  getOneList,
  getAllLists,
  createList,
  removeList
}
