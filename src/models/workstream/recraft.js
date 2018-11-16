const knex = require('../../../db')
// const RecraftItemModel = require('../WorkStream/recraft_items')
// const RecraftBundleModel = require('../workstream/recraft_bundles')
const priority = require('../workstream/priority')

function getOneRecraft(recraft_id) {
  return (knex('recraft').where({id: recraft_id}))
}

function getAllRecrafts(shop_id) {
  return knex('recraft')
  .where({shop_id: shop_id})
  .returning('*')
}

const createRecraft = async (shop_id, purchase_id) => {
  const recraft = await knex('recraft').insert({purchase_id: purchase_id, shop_id: shop_id}).returning('*')
  return recraft
}

function removeRecraft(recraft_id) {
  return (knex('recraft').where({id: recraft_id}).del())
}

const updateRecraft = async(recraft_id, completed) => {
  return (knex('recraft').update({completed: completed}).where({id: recraft_id}).returning('*'))
}

module.exports = {
  getOneRecraft,
  getAllRecrafts,
  createRecraft,
  removeRecraft,
  updateRecraft
}
