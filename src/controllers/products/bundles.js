const bundlesModel = require('../../models/Products/bundles')

function getOneBundle(req, res, next) {
  if (!req.params.bundle_id) {
    return next({status: 400, message: 'No bundle indicated'})
  }
  bundlesModel.getOneBundle(req.params.bundle_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllBundles(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the bundles"})
  }
  bundlesModel.getAllBundles(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllArchivedBundles(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the bundles"})
  }
  bundlesModel.getAllArchivedBundles(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createBundles(req, res, next) {
  if (!req.params.shop_id || !req.body) {
    return next({status: 400, message: 'Need proper bundle inputs'})
  }
  bundlesModel.createBundles(req.params.shop_id, req.body).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateBundles(req, res, next) {
  if (!req.params.bundle_id || !req.body) {
    return next({status: 400, message: 'Bad request'})
  }
  bundlesModel.updateBundles(req.params.bundle_id, req.body.product_id, req.body.category_id, req.body.name, req.body.image, req.body.stock_qty, req.body.archived, req.body.steps, req.body.items).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getOneBundle,
  getAllArchivedBundles,
  getAllBundles,
  createBundles,
  updateBundles
}
