const ordersModel = require('../../models/inventory/orders')

function getOneOrder(req, res, next) {
  if (!req.params.order_id) {
    return next({status: 400, message: 'No order indicated'})
  }
  ordersModel.getOneOrder(req.params.order_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllOrders(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the orders"})
  }
  ordersModel.getAllOrders(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createOrder(req, res, next) {
  if (!req.params.shop_id || !req.body) {
    return next({status: 400, message: 'Need proper order inputs'})
  }
  ordersModel.createOrder(req.params.shop_id, req.body).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateOrder(req, res, next) {
  if (!req.params.order_id || !req.body) {
    return next({status: 400, message: 'Bad request'})
  }
  ordersModel.updateOrder(req.params.order_id, req.body).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function updateOrderSupply(req, res, next) {
  if (!req.params.order_id || !req.body) {
    return next({status: 400, message: 'Bad request'})
  }
  ordersModel.updateOrderSupply(req.params.order_id, req.body).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getOneOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  updateOrderSupply
}
