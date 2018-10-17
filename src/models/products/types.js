const knex = require('../../../db')

function getOneType(type_id) {
  return (knex('types').where({id: type_id}).first())
}

function getAllTypes(shop_id) {
  return (knex('types').where({shop_id: shop_id}))
}

function createTypes(shop_id, name) {
  return (knex('types').insert({shop_id, name}).returning('*'))
}

function removeTypes(type_id) {
  return(knex('sources').update({type_id:null}).where({type_id:type_id}))
  .then(clean => {
    return (knex('types').where({id: type_id}).del())
  })
}

function updateTypes(type_id, name) {
  return (knex('types').update({name}).where({id: type_id}).returning('*'))
}

module.exports = {
  getOneType,
  getAllTypes,
  createTypes,
  removeTypes,
  updateTypes
}
