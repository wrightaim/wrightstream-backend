const knex = require('../../../db')

function getAllStore(shop_id) {
  return (knex('stores').where({shop_id: shop_id}))
}

function getOneStore(store_id) {
  return (knex('stores').where({id: store_id}).first())
}

function createStore(shop_id, body) {
  //CREATING INITIAL RELATIONSHIP

}

function removeStore(store_id) {
  return (knex('stores').where({id: store_id}).del())
}

function updateStore(store_id, body) {
  //REFRESHING TOKEN
}

module.exports = {
  getAllStore,
  getOneStore,
  createStore,
  removeStore,
  updateStore
}
