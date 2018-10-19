const knex = require('../../../db')

function getOneComment(comment_id) {
  return (knex('comments').where({id: comment_id}))
}

function getAllComments(purchase_id) {
  return (knex('comments').where({purchase_id: purchase_id}))
}

function createComment(purchase_id, staff_id, text) {
  return knex('comments').insert({purchase_id: purchase_id, staff_id: staff_id, text: text}).returning('*')
}

function removeComment(comment_id) {
  return (knex('comments').where({id: comment_id}).del())
}

function updateComment(comment_id, staff_id, text) {
  return (knex('comments').update({text: text}).where({id: comment_id, staff_id: staff_id}).returning('*'))
}

module.exports = {
  getOneComment,
  getAllComments,
  createComment,
  removeComment,
  updateComment
}
