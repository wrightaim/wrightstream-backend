const purchasesModel = require('../../models/WorkStream/purchases_bundles')


function getOnePurchaseBundle(req, res, next){
  if (!req.params.purchase_id || !req.params.bundle_id) {
    return next({status: 400, message: 'Missing purchase bundle fields'})
  }
  purchasesModel.getOnePurchaseBundle(req.params.purchase_id, req.params.bundle_id)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllPurchaseBundles(req, res, next){
  if (!req.params.purchase_id) {
    return next({status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.getAllPurchaseBundles(req.params.purchase_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createPurchaseBundle(req, res, next){
  if (!req.params.purchase_id || !req.body) {
    return next({status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.createPurchaseBundle(req.params.purchase_id, req.body.bundle_id, req.body.bundle_qty, req.body.completed, req.body.staff_id)
  .then(function(data) {
    return res.status(201).send({data})
  }).catch(next)
}


function updatePurchaseBundle(req, res, next){
  if (!req.params.purchase_id || !req.body) {
    return next({ status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.updatePurchaseBundle(req.params.purchase_id, req.params.bundle_id, req.body.item_qty, req.body.completed, req.body.staff_id)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

function removePurchaseBundle(req, res, next){
  if (!req.params.bundle_id || !req.params.purchase_id) {
    return next({status: 400, message: 'Missing purchase item fields'})
  }
  purchasesModel.removePurchaseBundle(req.params.purchase_id, req.params.bundle_id)
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
  getOnePurchaseBundle,
  getAllPurchaseBundles,
  createPurchaseBundle,
  removePurchaseBundle,
  updatePurchaseBundle
}
