const productsModel = require('../../models/products/products')

function getAllUnlinked(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Missing product fields'})
  }
  productsModel.getAllUnlinked(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllProducts(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Missing product fields'})
  }
  productsModel.getAllProducts(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getAllProducts,
  getAllUnlinked
}
