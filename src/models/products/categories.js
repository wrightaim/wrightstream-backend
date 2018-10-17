const knex = require('../../../db')

function getAllCategories(shop_id) {
  return (knex('categories').where({shop_id: shop_id}))
}

function getOneCategory(category_id) {
  return (knex('categories').where({id: category_id}).first())
}

function createCategories(shop_id, name) {
  return (knex('categories').insert({shop_id, name}).returning('*'))
}

function removeCategories(category_id) {
  return (knex('bundles').update({category_id: null}).where({category_id: category_id}))
  .then(bundle_clean => {
    return (knex('items').update({category_id: null}).where({category_id: category_id}))
  }).then(item_clean => {
    return (knex('categories').where({id: category_id}).del())
  })
}

function updateCategories(category_id, name) {
  return (knex('categories').update({name}).where({id: category_id}).returning('*'))
}

module.exports = {
  getOneCategory,
  getAllCategories,
  createCategories,
  removeCategories,
  updateCategories
}
