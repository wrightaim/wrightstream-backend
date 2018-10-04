const knex = require('../../../db')

function getOneKind(kind_id) {
  return (knex('kinds').where({id: kind_id}).first())
}

function getAllKinds(shop_id) {
  return (knex('kinds').where({shop_id: shop_id}))
}

function createKinds(shop_id, name) {
  return (knex('kinds').insert({shop_id, name}).returning('*'))
}

function removeKinds(kind_id) {
  return (knex('supplies').update({kind_id: null}).where({kind_id: kind_id}))
  .then(clean => {
    return (knex('kinds').where({id: kind_id}).del())
  })
}

function updateKinds(kind_id, name) {
  return (knex('kinds').update({name}).where({id: kind_id}).returning('*'))
}

module.exports = {
  getOneKind,
  getAllKinds,
  createKinds,
  removeKinds,
  updateKinds
}
