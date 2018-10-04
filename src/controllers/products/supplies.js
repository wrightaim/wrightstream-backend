const suppliesModel = require('../../models/products/supplies')

function getOneSupply(req, res, next) {
  if (!req.params.supplies_id) {
    return next({status: 400, message: 'No supply indicated'})
  }
  suppliesModel.getOneSupply(req.params.supplies_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllSupplies(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the supplies"})
  }
  suppliesModel.getAllSupplies(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createSupplies(req, res, next) {
  if (!req.params.shop_id || !req.body) {
    return next({status: 400, message: 'Need proper supply inputs'})
  }
  suppliesModel.createSupplies(req.params.shop_id, req.body).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateSupplies(req, res, next) {
  if (!req.params.supplies_id || !req.body) {
    return next({status: 400, message: 'Bad request'})
  }
  suppliesModel.updateSupplies(req.params.supplies_id, req.body.name, req.body.stock_qty, req.body.measure_type, req.body.measure_unit, req.body.source_id, req.body.kind_id, req.body.archived).then(data => {
    res.status(202).send({data})
  }).catch(next)
}

module.exports = {
  getOneSupply,
  getAllSupplies,
  createSupplies,
  updateSupplies
}
