const knex = require('../../../db')

function getTotalItemSold(shop_id) {
  let totalItemsSold = 0
  return getPurchaseData(shop_id).then(purchases => {
    return createItemsList(purchases)
  }).then(data => {
    const items = Object.entries(data)
    return items.reduce((acc, ele) => [
      ...acc,
      ...ele
    ]).reduce((acc, ele) => {
      if (typeof(ele) === 'object') {
        totalItemsSold += Number(ele.sold)
        return totalItemsSold
      }
    }, {})
  })
}

function getTotalBundleSold(shop_id) {
  let totalBundlesSold = 0
  return getPurchaseData(shop_id).then(purchases => {
    return createBundlesList(purchases)
  }).then(data => {
    const bundles = Object.entries(data)
    return bundles.reduce((acc, ele) => [
      ...acc,
      ...ele
    ]).reduce((acc, ele) => {
      if (typeof(ele) === 'object') {
        totalBundlesSold += Number(ele.sold)
        return totalBundlesSold
      }
    }, {})
  })
}

function getTotalProductSold(shop_id) {
  let totalProductsSold = 0
  return getPurchaseData(shop_id).then(purchases => {
    return getTotalItemSold(shop_id)
  }).then(items => {
    totalProductsSold += items
    return getTotalBundleSold(shop_id)
  }).then(data => {
    totalProductsSold += data
    return totalProductsSold
  })
}

function getItemQTY(shop_id) {
  return getPurchaseData(shop_id)
  .then(purchaseList => {
    if(purchaseList.length < 1) {
      throw {
        status : 400,
        message: 'No purchases exists'
      }
    }
    return purchaseList.map(purchaseList => purchaseList.items).reduce((acc, ele) => [
      ...acc,
      ...ele
    ]).reduce((acc, ele) => {
      if (acc.hasOwnProperty(ele.item_id)) {
        let newSuppliesNeeded = ele.item_qty
        acc[ele.item_id].neededSupplies += parseFloat(newSuppliesNeeded)
      } else {
        acc[ele.item_id] = ele
        let suppliesNeeded = acc[ele.item_id].item_qty
        acc[ele.item_id].neededSupplies = parseFloat(suppliesNeeded)
      }
      return acc
    }, {})
  })
}

function getBundleQTY(shop_id) {
  return getPurchaseData(shop_id)
  .then(purchaseList => {
    if(purchaseList.length < 1) {
      throw {
        status : 400,
        message: 'No purchases exists'
      }
    }
    return purchaseList.map(purchaseList => purchaseList.bundles).reduce((acc, ele) => [
      ...acc,
      ...ele
    ]).reduce((acc, ele) => {
      if (acc.hasOwnProperty(ele.bundle_id)) {
        let newSuppliesNeeded = ele.bundle_qty
        acc[ele.bundle_id].neededSupplies += parseFloat(newSuppliesNeeded)
      } else {
        acc[ele.bundle_id] = ele
        let suppliesNeeded = acc[ele.bundle_id].bundle_qty
        acc[ele.bundle_id].neededSupplies = parseFloat(suppliesNeeded)
      }
      return acc
    }, {})
  })
}

/////////////////////////////////////////////////////////////////////////////////////////////
////////HELPER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////
function getPurchaseData(shop_id) {
  return knex('purchases').where({shop_id: shop_id}).select('purchases.id', 'store_id', 'purchases.purchase_date').then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_items').innerJoin('items', 'purchases_items.item_id', 'items.id').select('purchases_items.item_id', 'purchases_items.item_qty', 'items.name',).where({'purchases_items.purchase_id': purchase.id}).then(items => {
        purchase.items = items
        return purchase
      }).then(bundles => {
        return knex('purchases_bundles').innerJoin('bundles', 'bundles.id', 'purchases_bundles.bundle_id').select('bundle_id', 'bundle_qty', 'bundles.name').where({'purchases_bundles.purchase_id': purchase.id}).then(bundlesList => {
          purchase.bundles = bundlesList
          return purchase
        })
      })
    })
    return Promise.all(promises)
  })
}

function createBundlesList(list) {
  if(list.length < 1) {
    throw {
      status : 400,
      message: 'No purchases exists'
    }
  }
  return list.map(list => list.bundles).reduce((acc, ele) => [
    ...acc,
    ...ele
  ]).reduce((acc, ele) => {
    if (acc.hasOwnProperty(ele.bundle_id)) {
      let bundlesSold = ele.bundle_qty
      acc[ele.bundle_id].sold += parseFloat(bundlesSold)
    } else {
      acc[ele.bundle_id] = ele
      let bundlesSold = acc[ele.bundle_id].bundle_qty
      acc[ele.bundle_id].sold = parseFloat(bundlesSold)
    }
    return acc
  }, {})
}

function createItemsList(list) {
  if(list.length < 1) {
    throw {
      status : 400,
      message: 'No products exists'
    }
  }
  return list.map(list => list.items).reduce((acc, ele) => [
    ...acc,
    ...ele
  ]).reduce((acc, ele) => {
    if (acc.hasOwnProperty(ele.item_id)) {
      let itemsSold = ele.item_qty
      acc[ele.item_id].sold += parseFloat(itemsSold)
    } else {
      acc[ele.item_id] = ele
      let itemsSold = acc[ele.item_id].item_qty
      acc[ele.item_id].sold = parseFloat(itemsSold)
    }
    return acc
  }, {})
}

module.exports = {
  getItemQTY,
  getBundleQTY,
  getTotalProductSold,
  getTotalBundleSold,
  getTotalItemSold
}
