const purchasesModel = require('../../models/WorkStream/purchases_statuses')

function getOnePurchaseStatus(req, res, next){
  if (!req.params.purchase_id) {
    return next({status: 400, message: 'Bad Request'})
  }
  purchasesModel.getOnePurchaseStatus(req.params.purchase_id, req.params.status_id)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllPurchaseStatuses(req, res, next){
  purchasesModel.getAllPurchaseStatuses(req.params.purchase_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createPurchaseStatus(req, res, next){
  if (!req.params.purchase_id) {
    return next({status: 400, message: 'Missing purchase status creation fields'})
  }
  purchasesModel.createPurchaseStatus(req.params.purchase_id, req.body.staff_id)
  .then(function(data) {
    return res.status(201).send({data})
  }).catch(next)
}

function removePurchaseStatuses(req, res, next){
  if (!req.params.purchase_id) {
    return next({status: 400, message: 'Missing purchase id'})
  }
  purchasesModel.removePurchaseStatuses(req.params.purchase_id, req.params.status_id)
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function updatePurchaseStatus(req, res, next){
  if (!req.params.purchase_id || !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  purchasesModel.updatePurchaseStatus(req.params.purchase_id, req.params.status_id, req.body.priority, req.body.completed, req.body.staff_id)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}



module.exports = {
  getOnePurchaseStatus,
  getAllPurchaseStatuses,
  createPurchaseStatus,
  removePurchaseStatuses,
  updatePurchaseStatus
}
