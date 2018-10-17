const listsModel = require('../../models/inventory/lists')

function getOneList(req, res, next) {
  if (!req.params.list_id) {
    return next({status: 400, message: 'No list indicated'})
  }
  listsModel.getOneList(req.params.list_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllLists(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the lists"})
  }
  listsModel.getAllLists(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createList(req, res, next) {
  if (!req.params.shop_id || !req.body) {
    return next({status: 400, message: 'Need proper list inputs'})
  }
  listsModel.createList(req.params.shop_id, req.body).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function removeList(req, res, next) {
  if (!req.params.list_id) {
    return next({status: 400, message: 'Need to know indicated list'})
  }
  listsModel.removeList(req.params.list_id).then(function(data) {
    res.status(204).send({data})
  }).catch(next)
}

module.exports = {
  getOneList,
  getAllLists,
  createList,
  removeList
}
