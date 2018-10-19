const knex = require('../../../db')

function getAllPriority(shop_id) {
  return (knex('priority').where({shop_id: shop_id}))
}

const removePriority = async(priority_type, shop_id, purchase_id) => {
  const priority = await knex('priority').where({shop_id: shop_id}).first()
  let result;
  priority_type === 'backlog' ? result = priority.backlog : null
  priority_type === 'pending' ? result = priority.pending : null
  priority_type === 'finalize' ? result = priority.finalize : null
  let parsed = JSON.parse(result)
  let filtered = parsed.filter(function(purchases) {
  purchase_id = parseInt(purchase_id)
  return purchases !== purchase_id;
})
  filtered = JSON.stringify(filtered)
  const newPrioirty = await knex('priority').where({shop_id: shop_id}).update(`${priority_type}`, filtered).returning('*')
  if(priority_type === 'backlog') {
    const inventory_checked = await inventoryChecker(shop_id)
  }
  return newPrioirty
}

const updatePriority = async(shop_id, body) => {
  const priority = await knex('priority').where({shop_id: shop_id}).first()
  let input;
  let priority_type;
  body.backlog ? (input = body.backlog) && (priority_type = 'backlog') : null
  body.pending ? (input = body.pending) && (priority_type = 'pending') : null
  body.finalize ? (input = body.finalize) && (priority_type = 'finalize') : null
  input = JSON.stringify(input)
  const newPrioirty = await knex('priority').where({shop_id: shop_id}).update(`${priority_type}`, input).returning('*')
  if(body.backlog) {
    const inventory_checked = await inventoryChecker(shop_id)
  }
  return newPrioirty
}

const inventoryChecker = async(shop_id) => {
  console.log("in inventoryChecker");
  return shop_id
}

module.exports = {
  getAllPriority,
  removePriority,
  updatePriority
}
