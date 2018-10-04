const storeModel = require('../../models/shop/stores')

function getOneStore(req, res, next) {
  if (!req.params.store_id) {
    return next({status: 400, message: 'No store indicated'})
  }
  storeModel.getOneStore(req.params.store_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllStore(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the stores"})
  }
  storeModel.getAllStore(req.params.shop_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createStore(req, res, next) {
  if (!req.params.shop_id || req.body) {
    return next({status: 400, message: 'Need to know indicated store'})
  }
  storeModel.createStore(req.params.shop_id, req.body)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateStore(req, res, next) {
  if (!req.params.store_id || !req.body) {
    return next({status: 400, message: 'Need to know indicated store'})
  }
  storeModel.createStore(req.params.store_id, req.body)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function removeStore(req, res, next) {
  if (!req.params.store_id) {
    return next({status: 400, message: 'Need to know indicated store'})
  }
  storeModel.removeStore(req.params.store_id)
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}


module.exports = {
  getAllStore,
  getOneStore,
  createStore,
  removeStore,
  updateStore
}
