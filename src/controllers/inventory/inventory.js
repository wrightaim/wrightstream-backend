const inventoryModel = require('../../models/inventory/inventory')

function getAllInventorySupplies(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the inventory supplies"})
  }
  inventoryModel.getAllInventorySupplies(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllInventoryProducts(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "Need specified shop to get the inventory products"})
  }
  inventoryModel.getAllInventoryProducts(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}


module.exports = {
  getAllInventorySupplies,
  getAllInventoryProducts
}
