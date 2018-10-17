const kindsModel = require('../../models/products/kinds')

function getOneKind(req, res, next) {
  if (!req.params.kind_id) {
    return next({status: 400, message: 'No kind indicated'})
  }
  kindsModel.getOneKind(req.params.kind_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllKinds(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the kinds"})
  }
  kindsModel.getAllKinds(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createKinds(req, res, next) {
  if (!req.params.shop_id || !req.body.name) {
    return next({status: 400, message: 'Need proper kind inputs'})
  }
  kindsModel.createKinds(req.params.shop_id, req.body.name).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateKinds(req, res, next) {
  if (!req.params.kind_id || !req.body.name) {
    return next({status: 400, message: 'Need kind params and body'})
  }
  kindsModel.updateKinds(req.params.kind_id, req.body.name).then(data => {
    res.status(202).send({data})
  }).catch(next)
}

function removeKinds(req, res, next) {
  if (!req.params.kind_id) {
    return next({status: 400, message: 'Need to know indicated kind'})
  }
  kindsModel.removeKinds(req.params.kind_id).then(function(data) {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getOneKind,
  getAllKinds,
  createKinds,
  removeKinds,
  updateKinds
}
