const shopModel = require('../../models/shop/shops')

function getOneShop(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Bad Request'})
  }
  shopModel.getOneShop(req.params.shop_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllShops(req, res, next){
  shopModel.getAllShops()
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createShop(req, res, next) {
  if (!req.body.shop_name) {
    return next({status: 400, message: 'Missing shop creation fields'})
  }
  shopModel.createShop(req.body)
  .then(function(data) {
    return res.status(201).send({data})
  }).catch(next)
}

function updateShop(req, res, next) {
  shopModel.updateShop(parseInt(req.params.shop_id), req.body.name, req.body.shop_name, req.body.email, req.body.logo)
  .then(data => {
    res.status(200).send({ data });
  })
  .catch(next);
}

function removeShop(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Missing shop id'})
  }
  shopModel.removeShop(parseInt(req.params.shop_id))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

//staff routes

function getOneStaff(req, res, next) {
  if (!req.params.staff_id || !req.params.shop_id) {
    return next({status: 400, message: 'No staff ID or Shop Id'})
  }
  shopModel.getOneStaff(req.params.staff_id, req.params.shop_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllStaff(req, res, next) {
  if (!req.params.shop_id) {
    return next({status: 400, message: "No shop id"})
  }
  shopModel.getAllStaff(req.params.shop_id)
  .then(data => {
    delete data.password
    res.status(200).send({data})
  })
  .catch(next)
}

function createStaff(req, res, next) {
  if (!req.params.shop_id || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
    return next({status: 400, message: 'Need proper staff inputs'})
  }
  shopModel.createStaff(req.body, parseInt(req.params.shop_id))
  .then(data => {
    delete data.password
    res.status(201).send({data})
  })
  .catch(next)
}

function updateStaff(req, res, next) {
  if (!req.body.password) {
    return next({ status: 400, message: 'Bad request'});
  }
  shopModel.updateStaff(parseInt(req.params.shop_id), parseInt(req.params.staff_id), req.body.first_name, req.body.last_name, req.body.password, req.body.email, req.body.photo, req.body.role, req.body.archived)
  .then(data => {
    res.status(200).send({ data });
  })
  .catch(next);
}

function removeStaff(req, res, next) {
  if (!req.params.staff_id) {
    return next({status: 400, message: 'Missing staff member'})
  }
  shopModel.removeStaff(parseInt(req.params.staff_id))
  .then(function(data) {
    delete data.password
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getAllShops,
  getOneShop,
  createShop,
  removeShop,
  updateShop,
  getAllStaff,
  getOneStaff,
  createStaff,
  updateStaff,
  removeStaff
}
