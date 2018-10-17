const itemsModel = require('../../models/products/items')

function getOneItem(req, res, next) {
  if (!req.params.item_id) {
    return next({status: 400, message: 'No item indicated'})
  }
  itemsModel.getOneItem(req.params.item_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllItems(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the items"})
  }
  itemsModel.getAllItems(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllArchivedItems(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the items"})
  }
  itemsModel.getAllArchivedItems(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createItems(req, res, next) {
  if (!req.params.shop_id || !req.body) {
    return next({status: 400, message: 'Need proper item inputs'})
  }
  itemsModel.createItems(req.params.shop_id, req.body).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateItems(req, res, next) {
  if (!req.params.item_id || !req.body) {
    return next({status: 400, message: 'Bad request'})
  }
  itemsModel.updateItems(req.params.item_id, req.body.product_id, req.body.category_id, req.body.name, req.body.image, req.body.stock_qty, req.body.archived, req.body.steps, req.body.supplies).then(data => {
    res.status(202).send({data})
  }).catch(next)
}

module.exports = {
  getOneItem,
  getAllItems,
  getAllArchivedItems,
  createItems,
  updateItems
}
