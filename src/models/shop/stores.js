const knex = require('../../../db')

function getAllStore(shop_id) {
  return (knex('stores').where({shop_id: shop_id}))
}

function getOneStore(store_id) {
  return (knex('stores').where({id: store_id}).first())
}

function removeStore(store_id) {
  return (knex('stores').where({id: store_id}).del())
}


module.exports = {
  getAllStore,
  getOneStore,
  removeStore,
}
