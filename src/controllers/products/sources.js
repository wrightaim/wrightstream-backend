const sourcesModel = require('../../models/products/sources')

function getOneSource(req, res, next) {
  if (!req.params.source_id) {
    return next({status: 400, message: 'No source indicated'})
  }
  sourcesModel.getOneSource(req.params.source_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllSources(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the sources"})
  }
  sourcesModel.getAllSources(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createSource(req, res, next) {
  if (!req.params.shop_id || !req.body) {
    return next({status: 400, message: 'Need proper source inputs'})
  }
  sourcesModel.createSource(req.params.shop_id, req.body).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateSource(req, res, next) {
  if (!req.params.source_id || !req.body) {
    return next({status: 400, message: 'Bad request'})
  }
  sourcesModel.updateSource(req.params.source_id, req.body.name, req.body.link, req.body.type_id).then(data => {
    res.status(202).send({data})
  }).catch(next)
}

function removeSource(req, res, next) {
  if (!req.params.source_id) {
    return next({status: 400, message: 'Need to know indicated source'})
  }
  sourcesModel.removeSource(req.params.source_id).then(function(data) {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getOneSource,
  getAllSources,
  createSource,
  removeSource,
  updateSource
}
