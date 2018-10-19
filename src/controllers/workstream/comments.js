const commentsModel = require('../../models/workstream/comments')

function getOneComment(req, res, next){
  if (!req.params.comment_id) {
    return next({status: 400, message: 'Bad Request'})
  }
  commentsModel.getOneComment(req.params.comment_id)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllComments(req, res, next){
  commentsModel.getAllComments(req.params.purchase_id)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createComment(req, res, next){
  if (!req.params.purchase_id) {
    return next({status: 400, message: 'Missing comment creation fields'})
  }
  commentsModel.createComment(req.params.purchase_id, req.body.staff_id, req.body.text)
  .then(function(data) {
    return res.status(201).send({data})
  }).catch(next)
}

function removeComment(req, res, next){
  if (!req.params.comment_id) {
    return next({status: 400, message: 'Missing comment id'})
  }
  commentsModel.removeComment(req.params.comment_id)
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateComment(req, res, next){
  if (!req.params.comment_id|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  commentsModel.updateComment(req.params.comment_id, req.body.staff_id, req.body.text)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}


module.exports = {
  getOneComment,
  getAllComments,
  createComment,
  removeComment,
  updateComment
}
