const typesModel = require('../../models/products/types')

function getOneType(req, res, next) {
  if (!req.params.type_id) {
    return next({status: 400, message: 'No type indicated'})
  }
  typesModel.getOneType(req.params.type_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllTypes(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the types"})
  }
  typesModel.getAllTypes(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createTypes(req, res, next) {
  if (!req.params.shop_id || !req.body.name) {
    return next({status: 400, message: 'Need proper type inputs'})
  }
  typesModel.createTypes(req.params.shop_id, req.body.name).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateTypes(req, res, next) {
  if (!req.params.type_id || !req.body.name) {
    return next({status: 400, message: 'No type indicated'})
  }
  typesModel.updateTypes(req.params.type_id, req.body.name).then(data => {
    res.status(202).send({data})
  }).catch(next)
}

function removeTypes(req, res, next) {
  if (!req.params.type_id) {
    return next({status: 400, message: 'Need to know indicated type'})
  }
  typesModel.removeTypes(req.params.type_id).then(function(data) {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getOneType,
  getAllTypes,
  createTypes,
  removeTypes,
  updateTypes
}
