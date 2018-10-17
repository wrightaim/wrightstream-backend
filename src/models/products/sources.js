const knex = require('../../../db')

function getOneSource(source_id) {
  return (knex('sources').where({id: source_id}).first())
}

function getAllSources(shop_id) {
  return (knex('sources').where({shop_id: shop_id}))
}

function createSource(shop_id, body) {
  return (knex('sources').insert({shop_id: shop_id, name: body.name, link: body.link, type_id: body.type_id}).returning('*'))
}

function removeSource(source_id) {
  return (knex('supplies').update({source_id: null}).where({source_id: source_id}))
  .then(clean => {
    return (knex('sources').where({id: source_id}).del())
  })
}

function updateSource(source_id, name, link, type) {
  const toUpdate = {}
  name
    ? toUpdate.name = name
    : null
  link
    ? toUpdate.link = link
    : null
  type
    ? toUpdate.type_id = type
    : null
  return (knex('sources').update(toUpdate).where({id: source_id}).returning('*'))
}

module.exports = {
  getOneSource,
  getAllSources,
  createSource,
  removeSource,
  updateSource
}
