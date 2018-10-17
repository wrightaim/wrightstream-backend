const adminModel = require('../../models/admin/supplies')

function mostUsed(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need specified shop to get admin supplies'})
  }
  adminModel.mostUsed(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function mostOrdered(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get admin supplies"})
  }
  adminModel.mostOrdered(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  mostUsed,
  mostOrdered
}
