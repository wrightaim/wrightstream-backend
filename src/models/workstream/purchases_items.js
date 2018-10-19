const knex = require('../../../db')

function getOnePurchaseItem(purchase_id, item_id) {
  return (knex('purchases_items').where({purchase_id: purchase_id, item_id: item_id}))
}

function getAllPurchaseItem(purchase_id) {
  return (knex('purchases_items').where({purchase_id: purchase_id}))
}

function createPurchaseItem(purchaseId, item_id, item_qty, completed, staff_id) {
  const toCreate = {}
  toCreate.purchase_id = purchaseId
  toCreate.item_id = item_id
  completed
    ? toCreate.completed = completed
    : false
  item_qty
    ? toCreate.item_qty = item_qty
    : null
  staff_id
    ? toCreate.staff_id = staff_id
    : null
  return (knex('purchases_items').insert(toCreate).returning('*'))
}

function updatePurchaseItem(purchaseId, item_id, item_qty, completed, staff_id) {
  const toUpdate = {}
  completed || completed === false
    ? toUpdate.completed = completed
    : null
  item_qty
    ? toUpdate.item_qty = item_qty
    : null
  staff_id || staff_id === null
    ? toUpdate.staff_id = staff_id
    : null
  return (knex('purchases_items').update(toUpdate).where({purchase_id: purchaseId, item_id: item_id}).returning('*'))
}

function removePurchaseItem(purchase_id, item_id) {
  return (knex('purchases_items').where({purchase_id: purchase_id, item_id: item_id}).del())
}

module.exports = {
  getOnePurchaseItem,
  getAllPurchaseItem,
  createPurchaseItem,
  removePurchaseItem,
  updatePurchaseItem
}
