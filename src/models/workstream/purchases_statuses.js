const knex = require('../../../db')
const helperModel = require('../Helper/measurement')
var convert = require('convert-units')


function getOnePurchaseStatus(purchase_id, status_id) {
  return (knex('purchases_statuses').where({purchase_id: purchase_id, status_id: status_id}))
}

function getAllPurchaseStatuses(purchase_id) {
  return (knex('purchases_statuses').where({purchase_id: purchase_id}))
}

function createPurchaseStatus(purchase_id, staff_id) {
  const purchase_statuses = [1, 2, 3, 4, 5]
  const promises = purchase_statuses.map(status_id => {
    let toCreate = {}
    toCreate.purchase_id = purchase_id
    toCreate.status_id = parseInt(status_id)
    staff_id
      ? toCreate.staff_id = staff_id
      : null
    return knex('purchases_statuses').insert(toCreate).returning('*')
  })
  return Promise.all(promises)
}

function removePurchaseStatuses(purchase_id, status_id) {
  return (knex('purchases_statuses').where({purchase_id: purchase_id, status_id: status_id}).del())
}

function updatePurchaseStatus(purchase_id, status_id, priority, completed, staff_id) {
  const toUpdate = {}
  priority
    ? toUpdate.priority = priority
    : null
  completed || completed === false
    ? toUpdate.completed = completed
    : null
  staff_id
    ? toUpdate.staff_id = staff_id
    : null

  if(status_id == 1 && completed === true) {
    updateStock(purchase_id)
  }

  return (knex('purchases_statuses')
  .update(toUpdate)
  .where({purchase_id: purchase_id, status_id: status_id})
  .returning('*'))
}

////////////////////////////////////////////////////////////////////////////////
///////Helper Function
////////////////////////////////////////////////////////////////////////////////

const updateStock = async function(purchase_id) {
  let neededItems = []
  let neededBundles = []
  return updateItems(purchase_id)
  .then(items => {
    neededItems = items
    return updateBundles(purchase_id)
  })
  .then(bundles => {
    neededBundles = bundles
    return helperModel.orderPredictor({neededItems, neededBundles})
  })
  .then(async function(suppliesList){
    return updateSupply(suppliesList)
  })
}

/////////////////////////////////////////////////////////////////////////////////
/////// STOCK MEASURE TYPE
/////////////////////////////////////////////////////////////////////////////////

const updateSupply = async function(suppliesList){
  const newDBSupplies = await Promise.all(suppliesList.map(supply => {
    return knex('supplies')
    .where({id: supply.supply_id})
  }))
  const dbSupplies = newDBSupplies.reduce((acc, ele) => [...acc,...ele])

  //MAPPING OVER AND MATCHING SUPPLIES
  let bundlePromiseArray = []
  for(const supply of suppliesList){
  const matchedSupply = dbSupplies.find(ele => ele.id === supply.supply_id)
  let newMeasureType;
  let newSupplyStock;

  if(matchedSupply.measure_type === 'unit'){
    newMeasureType = 'unit'
    newSupplyStock = parseInt(matchedSupply.stock_qty) - supply.supply_qty
  }
  else if (matchedSupply.measure_type === 'volume'){
    newMeasureType = 'tsp'
    matchedSupply.stock_qty = convert(parseInt(matchedSupply.stock_qty)).from(matchedSupply.stock_qty_measure_type).to('tsp')
    supply.supply_qty = convert(supply.supply_qty).from(supply.supply_measure_type).to('tsp')
    newSupplyStock = parseInt(matchedSupply.stock_qty) - supply.supply_qty
  }
  else if (matchedSupply.measure_type === 'length'){
    newMeasureType = 'ft'
    matchedSupply.stock_qty = convert(parseInt(matchedSupply.stock_qty)).from(matchedSupply.stock_qty_measure_type).to('ft')
    supply.supply_qty = convert(supply.supply_qty).from(supply.supply_measure_type).to('ft')
    newSupplyStock = parseInt(matchedSupply.stock_qty) - supply.supply_qty
  }
  else if (matchedSupply.measure_type === 'mass'){
    newMeasureType = 'oz'
    matchedSupply.stock_qty = convert(parseInt(matchedSupply.stock_qty)).from(matchedSupply.stock_qty_measure_type).to('oz')
    supply.supply_qty = convert(supply.supply_qty).from(supply.supply_measure_type).to('oz')
    newSupplyStock = parseInt(matchedSupply.stock_qty) - supply.supply_qty
  }

  if (matchedSupply.measure_type !== 'unit') {
    convertedSupplies = convert(newSupplyStock).from(newMeasureType).toBest({
      exclude: ['fl-oz', 'ft3', 'yd3', 'in3']
    })
    newMeasureType = convertedSupplies.unit
    newSupplyStock = Number(convertedSupplies.val)
  }
  const updateSupplyArray = knex('supplies').where({id: matchedSupply.id}).update({stock_qty: newSupplyStock, stock_qty_measure_type: newMeasureType})
  bundlePromiseArray.push(updateSupplyArray)
  }
  Promise.all(bundlePromiseArray)
}



const updateBundles = async function(purchase_id){
  let neededBundles = []

  const purchaseBundles = await knex('purchases_bundles').where({purchase_id: purchase_id})
  const bundleDB = await Promise.all(purchaseBundles.map(purchaseBundle => {
    return knex('bundles')
    .where({id: purchaseBundle.bundle_id})
    .select('id', 'stock_qty')
  }))
  const bundles = bundleDB.reduce((acc, ele) => [...acc,...ele])
//ALL BUNDLES DB PROMISES
  let bundlePromiseArray = []
  for(const bundle of purchaseBundles){
    let leftBundles = {}
    const matchedBundle = bundles.find(ele => ele.id === bundle.bundle_id)
    if(bundle.bundle_qty >= parseInt(matchedBundle.stock_qty)){
      const updatedBundleStock = knex('bundles').where({id: matchedBundle.id}).update({stock_qty: 0})
      leftBundles.id = bundle.bundle_id
      leftBundles.bundle_qty = bundle.bundle_qty - parseInt(matchedBundle.stock_qty)
      neededBundles.push(leftBundles)
      bundlePromiseArray.push(updatedBundleStock)
    }
    else {
      let newBundleStock = parseInt(matchedBundle.stock_qty) - bundle.bundle_qty
      const updateBundle = knex('bundles').where({id: matchedBundle.id}).update({stock_qty: newBundleStock})
      bundlePromiseArray.push(updateBundle)
    }
  }
Promise.all(bundlePromiseArray)
return neededBundles
}



const updateItems = async function(purchase_id) {
let neededItems = []
// ALL ITEMS
  const purchaseItems = await knex('purchases_items').where({purchase_id: purchase_id})
  const itemDB = await Promise.all(purchaseItems.map(purchaseItem => {
    return knex('items')
    .where({id: purchaseItem.item_id})
    .select('id', 'stock_qty')
  }))
  const items = itemDB.reduce((acc, ele) => [...acc,...ele])

//ALL ITEMS DB PROMISES
let promiseArray = []
  for(const item of purchaseItems){
    let leftItems = {}
    const matchedItem = items.find(ele => ele.id === item.item_id)
    if(item.item_qty > parseInt(matchedItem.stock_qty)){
      const updatedStock = knex('items').where({id: matchedItem.id}).update({stock_qty: 0})
      leftItems.id = item.item_id
      leftItems.item_qty = item.item_qty - parseInt(matchedItem.stock_qty)
      neededItems.push(leftItems)
      promiseArray.push(updatedStock)
    }
    else if (item.item_qty <= parseInt(matchedItem.stock_qty)){
      let newStock = parseInt(matchedItem.stock_qty) - item.item_qty
      const updateItem = knex('items').where({id: matchedItem.id}).update({stock_qty: newStock})
      promiseArray.push(updateItem)
    }
  }
  Promise.all(promiseArray)
  return neededItems
}


module.exports = {
  getOnePurchaseStatus,
  getAllPurchaseStatuses,
  createPurchaseStatus,
  removePurchaseStatuses,
  updatePurchaseStatus
}
