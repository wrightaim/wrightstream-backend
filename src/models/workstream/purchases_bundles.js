const knex = require('../../../db')

function getOnePurchaseBundle(purchase_id, bundle_id) {
  return (knex('purchases_bundles').where({purchase_id: purchase_id, bundle_id: bundle_id}))
}

function getAllPurchaseBundles(purchase_id) {
  return (knex('purchases_bundles').where({purchase_id: purchase_id}))
}

function createPurchaseBundle(purchase_id, bundle_id, bundle_qty, completed, staff_id) {
  const toCreate = {}
  toCreate.purchase_id = purchase_id
  toCreate.bundle_id = bundle_id
  staff_id
    ? toCreate.staff_id = staff_id
    : null
  completed || completed === false
    ? toCreate.completed = completed
    : null
  bundle_qty || bundle_qty === 0
    ? toCreate.bundle_qty = bundle_qty
    : null
  return (knex('purchases_bundles').insert(toCreate).returning('*'))
}

function updatePurchaseBundle(purchaseId, bundle_id, bundle_qty, completed, staff_id) {
  const toUpdate = {}
  completed || completed === false
    ? toUpdate.completed = completed
    : null
  bundle_qty
    ? toUpdate.bundle_qty = bundle_qty
    : null
  staff_id || staff_id === null
    ? toUpdate.staff_id = staff_id
    : null
  return (knex('purchases_bundles').update(toUpdate).where({purchase_id: purchaseId, bundle_id: bundle_id}).returning('*'))
}

function removePurchaseBundle(purchase_id, bundle_id) {
  return (knex('purchases_bundles').where({purchase_id: purchase_id, bundle_id: bundle_id}).del())
}

module.exports = {
  getOnePurchaseBundle,
  getAllPurchaseBundles,
  createPurchaseBundle,
  removePurchaseBundle,
  updatePurchaseBundle
}
