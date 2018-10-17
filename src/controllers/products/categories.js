const categoiesModel = require('../../models/products/categories')

function getOneCategory(req, res, next) {
  if (!req.params.category_id) {
    return next({status: 400, message: 'Need category id'})
  }
  categoiesModel.getOneCategory(req.params.category_id)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllCategories(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Need shop id'})
  }
  categoiesModel.getAllCategories(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createCategories(req, res, next) {
  if (!req.params.shop_id || !req.body.name) {
    return next({status: 400, message: 'Need proper category inputs'})
  }
  categoiesModel.createCategories(req.params.shop_id, req.body.name)
  .then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateCategories(req, res, next) {
  if (!req.params.category_id || !req.body.name) {
    return next({status: 400, message: 'Need proper category inputs'})
  }
  categoiesModel.updateCategories(req.params.category_id, req.body.name).then(data => {
    res.status(202).send({data})
  }).catch(next)
}

function removeCategories(req, res, next) {
  if (!req.params.category_id) {
    return next({status: 400, message: 'Need category id'})
  }
  categoiesModel.removeCategories(req.params.category_id).then(function(data) {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getOneCategory,
  getAllCategories,
  createCategories,
  removeCategories,
  updateCategories
}
