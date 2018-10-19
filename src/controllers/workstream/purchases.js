const purchasesModel = require('../../models/workstream/purchases')

function getOnePurchase(req, res, next){
  if (!req.params.purchase_id) {
    return next({status: 400, message: 'Bad Request'})
  }
  purchasesModel.getOnePurchase(req.params.purchase_id)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllPurchases(req, res, next){
  purchasesModel.getAllPurchases(req.params.shop_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createPurchases(req, res, next){
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Missing shop creation fields'})
  }
  purchasesModel.createPurchases(req.params.shop_id, req.body.store_id, req.body.delivery_date, req.body.staff_id, req.body.purchase_date, req.body.order_id, req.body.service, req.body.tracking, req.body.items, req.body.bundles)
  .then(function(data) {
    return res.status(201).send({data})
  }).catch(next)
}

function removePurchases(req, res, next){
  if (!req.params.purchase_id) {
    return next({status: 400, message: 'Missing purchase id'})
  }
  purchasesModel.removePurchases(req.params.purchase_id)
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function updatePurchases(req, res, next){
  if (!req.params.purchase_id|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  purchasesModel.updatePurchases(req.params.purchase_id, req.body.delivery_date, req.body.store_id, req.body.shop_id, req.body.staff_id, req.body.quality_check, req.body.archived, req.body.pick_up, req.body.purchase_date, req.body.service, req.body.tracking)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}


module.exports = {
  getOnePurchase,
  getAllPurchases,
  createPurchases,
  removePurchases,
  updatePurchases
}
