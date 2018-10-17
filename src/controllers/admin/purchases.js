const adminModel = require('../../models/admin/purchases')

function purchaseStatuses(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need specified shop to get the current purchases'})
  }
  adminModel.purchaseStatuses(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function newPurchases(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need specified shop to get the new purchases'})
  }
  adminModel.newPurchases(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function productionPurchases(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need specified shop to get the inProduction purchases'})
  }
  adminModel.productionPurchases(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function totalPurchases(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need specified shop to get the total purchases'})
  }
  adminModel.totalPurchases(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function completedPurchases(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need specified shop to get the completed purchases'})
  }
  adminModel.completedPurchases(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function purchasesHistory(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need specified shop to get the purchases'})
  }
  adminModel.purchasesHistory(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  purchaseStatuses,
  purchasesHistory,
  newPurchases,
  productionPurchases,
  totalPurchases,
  completedPurchases
}
