const helperModel = require('../../models/Helper/measurement')
const convert = require('convert-units')

function volume(req, res, next) {
  const volumeMeasures = convert().possibilities('volume')
  res.status(200).send({volumeMeasures})
}

function length(req, res, next) {
  const lengthMeasures = convert().possibilities('length')
  res.status(200).send({lengthMeasures})
}

function mass(req, res, next) {
  const massMeasures = convert().possibilities('mass')
  res.status(200).send({massMeasures})
}

function wrightStream(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need proper shop inputs'})
  }
  helperModel.wrightStream(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function orderPredictor(req, res, next) {
  if (!req.body || !req.params.shop_id) {
    return next({status: 400, message: "Need proper supplies inputs"})
  }
  helperModel.orderPredictor(req.params.shop_id, req.body).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

module.exports = {
  volume,
  length,
  mass,
  wrightStream,
  orderPredictor
}
