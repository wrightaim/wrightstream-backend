const recraftModel = require('../../models/workstream/recraft')

function getOneRecraft(req, res, next){
  if (!req.params.recraft_id) {
    return next({status: 400, message: 'Bad Request'})
  }
  recraftModel.getOneRecraft(req.params.recraft_id)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllRecrafts(req, res, next){
  recraftModel.getAllRecrafts(req.params.shop_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createRecraft(req, res, next){
  console.log(req.params);
  if (!req.params.shop_id || !req.params.purchase_id) {
    return next({status: 400, message: 'Missing recraft creation fields'})
  }
  recraftModel.createRecraft(req.params.shop_id, req.params.purchase_id)
  .then(function(data) {
    return res.status(201).send({data})
  }).catch(next)
}

function removeRecraft(req, res, next){
  if (!req.params.recraft_id) {
    return next({status: 400, message: 'Missing purchase id'})
  }
  recraftModel.removeRecraft(req.params.recraft_id)
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateRecraft(req, res, next){
  if (!req.params.recraft_id|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  recraftModel.updateRecraft(req.params.recraft_id, req.body.completed)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}


module.exports = {
  getOneRecraft,
  getAllRecrafts,
  createRecraft,
  removeRecraft,
  updateRecraft
}
