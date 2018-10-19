const priorityModel = require('../../models/workstream/priority')

function getAllPriority(req, res, next){
  priorityModel.getAllPriority(req.params.shop_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function updatePriority(req, res, next){
  if (!req.params.shop_id) {
    return next({status: 400, message: 'Missing purchase id'})
  }
  priorityModel.updatePriority(req.params.shop_id, req.body)
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function removePriority(req, res, next){
  if (!req.params.shop_id || !req.params.priority_type || !req.params.purchase_id) {
    return next({ status: 400, message: 'Bad request'})
  }
  priorityModel.removePriority(req.params.priority_type, req.params.shop_id, req.params.purchase_id)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}


module.exports = {
  getAllPriority,
  removePriority,
  updatePriority
}
