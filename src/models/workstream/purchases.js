const knex = require('../../../db')
const PurchaseStatusModel = require('../WorkStream/purchases_statuses')
const PurchaseItemModel = require('../WorkStream/purchases_items')
const PurchaseBundleModel = require('../workstream/purchases_bundles')
const Helper = require('../helper/measurement')
const priority = require('../workstream/priority')

function getOnePurchase(purchase_id) {
  return (knex('purchases').where({id: purchase_id}))
}

function getAllPurchases(shop_id) {
  return knex('purchases')
  .where({shop_id: shop_id})
  .then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_statuses')
      .join('statuses', 'statuses.id', 'purchases_statuses.status_id').where('purchases_statuses.purchase_id', purchase.id).then(status => {
        purchase.statuses = status
        return purchase
      })
      .then(bundles => {
        return knex('purchases_bundles').join('bundles', 'bundles.id', 'purchases_bundles.bundle_id').select('bundles.id', 'bundle_qty', 'bundles.name', 'completed', 'archived', 'steps', 'image', 'staff_id').where('purchases_bundles.purchase_id', purchase.id)
        .then(bundlesList => {
          purchase.bundles = bundlesList
          return purchase
        }).then(bundleItems => {
          const bundlepromises = bundleItems.bundles.map(bundless => {
            return knex('bundles_items').join('items', 'items.id', 'bundles_items.item_id').select('items.id', 'item_qty', 'items.name', 'bundle_id', 'steps', 'image', 'stock_qty').where('bundles_items.bundle_id', bundless.id).then(bundle_items => {
              bundless.bundle_items = bundle_items
              return bundles
            })
          })
          return Promise.all(bundlepromises)
        }).then(supplies => {
          return knex('purchases_supplies').join('supplies', 'supplies.id', 'purchases_supplies.supply_id').select('supply_id', 'supply_qty', 'purchases_supplies.measure_unit', 'completed', 'name').where('purchases_supplies.purchase_id', purchase.id).then(supplyList => {
            purchase.supplies = supplyList
            return purchase
          })
        }).then(items => {
          return knex('purchases_items').join('items', 'items.id', 'purchases_items.item_id').select('items.id', 'item_qty', 'items.name', 'completed', 'archived', 'steps', 'image', 'staff_id').where('purchases_items.purchase_id', purchase.id).then(itemsList => {
            purchase.items = itemsList
            return purchase
          })
        })
      })
    })
    return Promise.all(promises)
  })
}

const createPurchases = async (shop_id, store_id, delivery_date, staff_id, purchase_date, receipt_id, service, tracking, items, bundles) => {
  const toCreate = {}
  shop_id
    ? toCreate.shop_id = shop_id
    : null
  delivery_date
    ? toCreate.delivery_date = delivery_date
    : null
  store_id
    ? toCreate.store_id = store_id
    : null
  staff_id
    ? toCreate.staff_id = staff_id
    : null
  receipt_id
    ? toCreate.receipt_id = receipt_id
    : null
  purchase_date
    ? toCreate.purchase_date = purchase_date
    : null
  service
    ? toCreate.service = service
    : null
  tracking
    ? toCreate.tracking = tracking
    : null
  const purchase = await knex('purchases').insert(toCreate).returning('*')
  const purchase_statuses = await PurchaseStatusModel.createPurchaseStatus(purchase[0].id, null)
  const priority_backlog = await knex('priority').where({shop_id: shop_id})
  let current_backlog = JSON.parse(priority_backlog[0].backlog)
  current_backlog.push(purchase[0].id)
  current_backlog = JSON.stringify(current_backlog)
  const updated_backlog = await knex('priority').where({shop_id: shop_id}).update({backlog: current_backlog})
  if (items) {
    const itemPromises = items.map(item => {
      let item_id = item.id
      let item_qty = item.item_qty
      let completed = null
      let staff_id = null
      return PurchaseItemModel.createPurchaseItem(purchase[0].id, item_id, item_qty, completed, staff_id)
    })
    const purchase_items = await Promise.all(itemPromises)
  }
  if (bundles) {
    const bundlePromises = bundles.map(bundle => {
      let bundle_id = bundle.bundle_id
      let bundle_qty = bundle.bundle_qty
      let completed = null
      let staff_id = null
      return PurchaseBundleModel.createPurchaseBundle(purchase[0].id, bundle_id, bundle_qty, completed, staff_id)
    })
    const purchase_bundles = await Promise.all(bundlePromises)
  }
  const supplies = await Helper.orderPredictor(shop_id, {items, bundles})
  if (supplies && !supplies.items && !supplies.bundles) {
    const purchaseSupplies = supplies.map(supply => {
      return knex('purchases_supplies').insert({
        'purchase_id': purchase[0].id,
        'supply_id': parseInt(supply.supply_id),
        'supply_qty': parseInt(supply.supply_qty),
        'measure_unit': supply.supply_measure_type
      }).returning('*')
    })
    const purchase_supplies = await Promise.all(purchaseSupplies)
  }
  return purchase
}

function removePurchases(purchase_id) {
  return (knex('purchases').where({id: purchase_id}).del())
}

const updatePurchases = async(purchase_id, delivery_date, store_id, shop_id, staff_id, quality_check, archived, pick_up, purchase_date, service, tracking) => {
  const toUpdate = {}
  store_id
    ? toUpdate.store_id = store_id
    : null
  shop_id
    ? toUpdate.shop_id = shop_id
    : null
  staff_id || staff_id === null
    ? toUpdate.staff_id = staff_id
    : null
  purchase_date
    ? toUpdate.purchase_date = purchase_date
    : null
  service
    ? toUpdate.service = service
    : null
  quality_check || quality_check === false
    ? toUpdate.quality_check = quality_check
    : null
  archived || archived === false
    ? toUpdate.archived = archived
    : null
  pick_up || pick_up === false
    ? toUpdate.pick_up = pick_up
    : null
  delivery_date
    ? toUpdate.delivery_date = delivery_date
    : null
  tracking
    ? toUpdate.tracking = tracking
    : null
  return (knex('purchases').update(toUpdate).where({id: purchase_id}).returning('*'))
}

module.exports = {
  getOnePurchase,
  getAllPurchases,
  createPurchases,
  removePurchases,
  updatePurchases
}
