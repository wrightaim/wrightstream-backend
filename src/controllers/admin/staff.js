const adminModel = require('../../models/admin/staff')

function getCurrentStaff(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need specified shop to get the current staff'})
  }
  adminModel.getCurrentStaff(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getPastStaff(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the past staff"})
  }
  adminModel.getPastStaff(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function totalStaff(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get staff"})
  }
  adminModel.totalStaff(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function currentWorkingStaff(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get staff"})
  }
  adminModel.currentWorkingStaff(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getCurrentStaff,
  getPastStaff,
  totalStaff,
  currentWorkingStaff
}
