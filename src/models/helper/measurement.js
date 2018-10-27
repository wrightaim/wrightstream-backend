const knex = require('../../../db')
const convert = require('convert-units')

function wrightStream(shop_id) {
  return (knex('purchases').where({shop_id: shop_id}).select('id', 'store_id')).then(purchases => {
    const purchasePromise = purchases.map(purchase => {
      return knex('purchases_items').innerJoin('items', 'purchases_items.item_id', 'items.id').innerJoin('purchases_statuses', 'purchases_items.purchase_id', 'purchases_statuses.purchase_id').select('purchases_items.item_id', 'purchases_items.item_qty', 'items.name').where({'purchases_items.purchase_id': purchase.id}).andWhere({'purchases_statuses.purchase_id': purchase.id, 'status_id': 1, 'purchases_statuses.completed': false}).then(items => {
        purchase.items = items
        return purchase
      }).then(bundles => {
        return knex('purchases_bundles').innerJoin('bundles', 'bundles.id', 'purchases_bundles.bundle_id').innerJoin('purchases_statuses', 'purchases_bundles.purchase_id', 'purchases_statuses.purchase_id').select('bundle_id', 'bundle_qty', 'bundles.name').where({'purchases_bundles.purchase_id': purchase.id}).andWhere({'purchases_statuses.purchase_id': purchase.id, 'status_id': 1, 'purchases_statuses.completed': false}).then(bundlesList => {
          purchase.bundles = bundlesList
          return purchase
        })
      })
    })
    return Promise.all(purchasePromise)
  })
}

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//////// Inventory analyzer
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

const inventoryAnalyzer = async (backlog, currentInventory, currentProducts) => {
  if (backlog.length === 0) return backlog
  for (let i = 0; i < backlog.length; i++) {
    const purchase_items = await knex('purchases_items').where({purchase_id: backlog[i]}).select('item_id', 'item_qty')
    const purchase_bundles = await knex('purchases_bundles').where({purchase_id: backlog[i]}).select('bundle_id', 'bundle_qty')

    const itemsMatched = purchase_items.map(item => {
      const itemMatch = currentProducts.items.find(itemsList => itemsList.id === item.item_id)
      if(itemMatch.stock_qty > item.item_qty) {
        console.log("larger");
      }
      else if(itemMatch.stock_qty < item.item_qty) {
        console.log("smaller");
      }
      return itemMatch
    })

    const bundlesMatched = purchase_bundles.map(bundle => {
      const bundleMatch = currentProducts.bundles.find(bundlesList => bundlesList.id === bundle.bundle_id)
      if(bundleMatch.stock_qty > bundle.bundle_qty) {
        console.log("larger");
      }
      else if(bundleMatch.stock_qty < bundle.bundle_qty) {
        console.log("smaller");
      }
      return bundleMatch
    })
//need to map over all quantities to evaluate below
    if(purchase_items.item_qty === 0 && purchase_bundles.bundle_qty === 0){
      const purchase_supplies = await knex('purchases_supplies').where({purchase_id: backlog[i]}).update({completed: true})
      console.log(purchase_supplies);
    }
    else {
      //start with supplies and then one by one update them
      console.log(purchase_items, purchase_bundles, "need to check supplies list");
    }
  }
  return backlog
}

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////Predictor Routes
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

const orderPredictor = async (shop_id, body) => {
  body.compare === true
    ? body.compare = true
    : body.compare = false
  const items = body.items || null
  const bundles = body.bundles || null
  let empty = []
  let items_completed
  let bundles_completed
  let combined_supplies

  if (!items.length >= 1 && !bundles.length >= 1) {
    return Promise.resolve(empty)
  }

  if (items.length > 0) {
    const items_supplies = await itemSupplies(items)
    items_completed = await createItemsList(items_supplies)
  }
  if (bundles.length > 0) {
    const bundle_items = await bundleItems(bundles)
    const bundle_supplies = await bundleSupplies(bundle_items, bundles)
    bundles_completed = await createBundleSuppliesList(bundle_supplies)
  }
  if (items_completed && bundles_completed) {
    combined_supplies = await combine(items_completed, bundles_completed)
  }
  if (body.compare === true) {
    if (combined_supplies) {
      let supplies_compared = await supplyCompare(combined_supplies, shop_id)
      return orderData(supplies_compared)
    } else if (items_completed && !bundles_completed) {
      let supplies_compared = await supplyCompare(items_completed, shop_id)
      return orderData(supplies_compared)
    } else if (!items_completed && bundles_completed) {
      let supplies_compared = await supplyCompare(bundles_completed, shop_id)
      return orderData(supplies_compared)
    }
  } else if (body.compare === false) {
    if (combined_supplies) {
      return orderData(combined_supplies)
    } else if (items_completed && !bundles_completed) {
      return orderData(items_completed)
    } else if (!items_completed && bundles_completed) {
      return orderData(bundles_completed)
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Item helper functions////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function itemSupplies(items) {
  const itemsArray = items.map(item => {
    return knex('items').where({id: item.id}).select('items.id', 'items.name').then(products => {
      const promises = products.map(product => {
        return knex('items_supplies').join('supplies', 'supplies.id', 'items_supplies.supplies_id').where('items_supplies.item_id', product.id).select('items_supplies.supply_qty', 'items_supplies.measure_unit', 'supplies.measure_type', 'supplies.name', 'supplies.id').then(supplies => {
          product.supply = supplies.map(ele => ({
            ...ele,
            item_qty: items.find(ele => ele.id === product.id).item_qty
          }))
          return product
        })
      })
      return Promise.all(promises)
    })
  })
  return Promise.all(itemsArray)
}

function createItemsList(supplies_list) {
  console.log(supplies_list);
  return supplies_list.reduce((acc, ele) => [
    ...acc,
    ...ele
  ]).map(supply => supply.supply).reduce((acc, ele) => [
    ...acc,
    ...ele
  ]).reduce((acc, ele) => {
    if (acc.hasOwnProperty(ele.id)) {
      let measure_type;
      let newSuppliesNeeded = ele.supply_qty * ele.item_qty
      if (ele.measure_type === 'volume') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.measure_unit).to('tsp')
      } else if (ele.measure_type === 'length') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.measure_unit).to('ft')
      } else if (ele.measure_type === 'mass') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.measure_unit).to('oz')
      }
      acc[ele.id].neededSupplies += parseFloat(newSuppliesNeeded)
    } else {
      acc[ele.id] = ele
      let suppliesNeeded = acc[ele.id].supply_qty * acc[ele.id].item_qty
      if (acc[ele.id].measure_type === 'volume') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].measure_unit).to('tsp')
        measure_type = 'tsp'
      } else if (acc[ele.id].measure_type === 'length') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].measure_unit).to('ft')
        measure_type = 'ft'
      } else if (acc[ele.id].measure_type === 'unit') {
        suppliesNeeded = suppliesNeeded
        measure_type = 'unit'
      } else if (acc[ele.id].measure_type === 'mass') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].measure_unit).to('oz')
        measure_type = 'oz'
      }
      acc[ele.id].neededSupplies = parseFloat(suppliesNeeded)
      acc[ele.id].new_measure = measure_type
    }

    return acc
  }, {})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////bundle helper functions//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function bundleItems(bundles) {
  const bundles_array = bundles.map(bundle => {
    const bundle_id = bundle.id || bundle.bundle_id
    return knex('bundles').where({id: bundle_id}).select('bundles.id', 'bundles.name').then(packages => {
      const promises = packages.map(package => {
        return knex('bundles_items').join('items', 'items.id', 'bundles_items.item_id').where('bundles_items.bundle_id', package.id).select('stock_qty', 'name', 'item_id', 'item_qty', 'bundle_id').then(items => {
          package.item = items
          return package
        })
      })
      return Promise.all(promises)
    })
  })
  return Promise.all(bundles_array).then(data => {
    return data.reduce((acc, ele) => [
      ...acc,
      ...ele
    ])
  })
}

function createBundleSuppliesList(bundle_supplies) {
  return bundle_supplies.map(supply => supply.supply).reduce((acc, ele) => [
    ...acc,
    ...ele
  ]).reduce((acc, ele) => {
    if (acc.hasOwnProperty(ele.id)) {
      let measure_type;
      let newSuppliesNeeded = (ele.supply_qty * ele.item_qty) * ele.bundle_qty
      if (ele.measure_type === 'volume') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.measure_unit).to('tsp')
      } else if (ele.measure_type === 'length') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.measure_unit).to('ft')
      } else if (ele.measure_type === 'mass') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.measure_unit).to('oz')
      }
      acc[ele.id].neededSupplies += parseFloat(newSuppliesNeeded)
    } else {
      acc[ele.id] = ele
      let measure_type;
      let suppliesNeeded = (acc[ele.id].supply_qty * acc[ele.id].item_qty) * acc[ele.id].bundle_qty
      if (acc[ele.id].measure_type === 'volume') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].measure_unit).to('tsp')
        measure_type = 'tsp'
      } else if (acc[ele.id].measure_type === 'unit') {
        suppliesNeeded = suppliesNeeded
        measure_type = 'unit'
      } else if (acc[ele.id].measure_type === 'length') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].measure_unit).to('ft')
        measure_type = 'ft'
      } else if (acc[ele.id].measure_type === 'mass') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].measure_unit).to('oz')
        measure_type = 'oz'
      }
      acc[ele.id].neededSupplies = parseFloat(suppliesNeeded)
      acc[ele.id].new_measure = measure_type
    }
    return acc
  }, {})
}

function bundleSupplies(bundleItems, bundles) {
  let bundledItems = bundleItems.map(ele => ele.item).reduce((acc, ele) => [
    ...acc,
    ...ele
  ])
  return Promise.resolve(bundledItems).then(items => {
    const promises = items.map(item => {
      return knex('items_supplies').join('supplies', 'supplies.id', 'items_supplies.supplies_id').where('items_supplies.item_id', item.item_id).select('items_supplies.supply_qty', 'items_supplies.measure_unit', 'supplies.measure_type', 'supplies.name', 'supplies.id').then(supplies => {
        item.supply = supplies.map(ele => ({
          ...ele,
          item_qty: items.find(ele => ele.item_id === item.item_id).item_qty,
          bundle_qty: bundles.find(ele => ele.id === bundles.bundle_id).bundle_qty
        }))
        return item
      })
    })
    return Promise.all(promises)
  })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Compare and Combine////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const supplyCompare = async function(addedSupply, shopId) {
  // console.log(typeof addedSupply["1"], addedSupply["1"]);
  // const newDBSupplies = await Promise.all(addedSupply.map(supply => {
  //   return knex('supplies')
  //   .where({id: supply.id})
  // }))
  // const dbSupplies = newDBSupplies.reduce((acc, ele) => [...acc,...ele])
  //MAPPING OVER AND MATCHING SUPPLIES
  // let bundlePromiseArray = []
  // for(const supply of addedSupply){
  //   console.log(supply);
  // const matchedSupply = dbSupplies.find(ele => ele.id === supply.supply_id)
  // let newMeasureType;
  // let newSupplyStock;
  //
  // if(matchedSupply.measure_type === 'unit'){
  //   newMeasureType = 'unit'
  //   newSupplyStock = parseInt(matchedSupply.stock_qty) - supply.supply_qty
  // }
  // else if (matchedSupply.measure_type === 'volume'){
  //   newMeasureType = 'tsp'
  //   matchedSupply.stock_qty = convert(parseInt(matchedSupply.stock_qty)).from(matchedSupply.stock_qty_measure_type).to('tsp')
  //   supply.supply_qty = convert(supply.supply_qty).from(supply.supply_measure_type).to('tsp')
  //   newSupplyStock = parseInt(matchedSupply.stock_qty) - supply.supply_qty
  // }
  // else if (matchedSupply.measure_type === 'length'){
  //   newMeasureType = 'ft'
  //   matchedSupply.stock_qty = convert(parseInt(matchedSupply.stock_qty)).from(matchedSupply.stock_qty_measure_type).to('ft')
  //   supply.supply_qty = convert(supply.supply_qty).from(supply.supply_measure_type).to('ft')
  //   newSupplyStock = parseInt(matchedSupply.stock_qty) - supply.supply_qty
  // }
  //   else if (matchedSupply.measure_type === 'mass'){
  //     newMeasureType = 'oz'
  //     matchedSupply.stock_qty = convert(parseInt(matchedSupply.stock_qty)).from(matchedSupply.stock_qty_measure_type).to('oz')
  //     supply.supply_qty = convert(supply.supply_qty).from(supply.supply_measure_type).to('oz')
  //     newSupplyStock = parseInt(matchedSupply.stock_qty) - supply.supply_qty
  //   }
  // if (matchedSupply.measure_type !== 'unit') {
  //   convertedSupplies = convert(newSupplyStock).from(newMeasureType).toBest({
  //     exclude: ['fl-oz', 'ft3', 'yd3', 'in3']
  //   })
  //   newMeasureType = convertedSupplies.unit
  //   newSupplyStock = Number(convertedSupplies.val)
  // }
  // const updateSupplyArray = knex('supplies').where({id: matchedSupply.id}).update({stock_qty: newSupplyStock, stock_qty_measure_type: newMeasureType})
  // bundlePromiseArray.push(updateSupplyArray)
  // }
  // Promise.all(bundlePromiseArray)
  return addedSupply
}

function combine(lists, comBunSupp) {
  let items = lists
  let bundles = comBunSupp
  let arrayItems = Object.values(items)
  let arrayBundles = Object.values(bundles)
  let result = arrayItems.concat(arrayBundles);
  return result.reduce((acc, ele) => {
    if (acc.hasOwnProperty(ele.id)) {
      let newSuppliesNeeded = ele.neededSupplies
      acc[ele.id].neededSupplies += parseFloat(newSuppliesNeeded)
    } else {
      acc[ele.id] = ele
      let suppliesNeeded = acc[ele.id].neededSupplies
      acc[ele.id].neededSupplies = parseFloat(suppliesNeeded)
    }
    return acc
  }, {})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Clean up code and send it//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function orderData(addedSupplies) {
  let supplies = []
  let data = {}
  for (var i in addedSupplies) {
    data = {}
    if (addedSupplies[i].new_measure !== 'unit') {
      convertedSupplies = convert(addedSupplies[i].neededSupplies).from(addedSupplies[i].new_measure).toBest({
        exclude: ['fl-oz', 'ft3', 'yd3', 'in3']
      })
      convertedSupplies.val = convertedSupplies.val.toPrecision(3);
      data.supply_qty = Number(convertedSupplies.val)
      data.supply_measure_type = convertedSupplies.unit
      data.supply_id = addedSupplies[i].id
      supplies.push(data)
    } else {
      data.supply_qty = Number(addedSupplies[i].neededSupplies)
      data.supply_measure_type = 'unit'
      data.supply_id = addedSupplies[i].id
      supplies.push(data)
    }
  }
  return supplies
}

module.exports = {
  inventoryAnalyzer,
  wrightStream,
  orderPredictor
}
