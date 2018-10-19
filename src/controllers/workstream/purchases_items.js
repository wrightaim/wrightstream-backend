const purchasesModel = require('../../models/WorkStream/purchases_items')


function getOnePurchaseItem(req, res, next){
  if (!req.params.purchase_id || !req.params.item_id) {
    return next({status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.getOnePurchaseItem(req.params.purchase_id, req.params.item_id)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllPurchaseItem(req, res, next){
  if (!req.params.purchase_id) {
    return next({status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.getAllPurchaseItem(req.params.purchase_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createPurchaseItem(req, res, next){
  if (!req.params.purchase_id || !req.body) {
    return next({status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.createPurchaseItem(req.params.purchase_id, req.body.item_id, req.body.item_qty, req.body.completed, req.body.staff_id)
  .then(function(data) {
    return res.status(201).send({data})
  }).catch(next)
}


function updatePurchaseItem(req, res, next){
  if (!req.params.purchase_id || !req.body) {
    return next({ status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.updatePurchaseItem(req.params.purchase_id, req.params.item_id, req.body.item_qty, req.body.completed, req.body.staff_id)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

function removePurchaseItem(req, res, next){
  if (!req.params.item_id || !req.params.purchase_id) {
    return next({status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.removePurchaseItem(req.params.purchase_id, req.params.item_id)
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
  getOnePurchaseItem,
  getAllPurchaseItem,
  createPurchaseItem,
  removePurchaseItem,
  updatePurchaseItem
}
