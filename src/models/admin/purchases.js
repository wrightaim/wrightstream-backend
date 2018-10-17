const knex = require('../../../db')

function purchaseStatuses(shop_id) {
  return knex('purchases').where({shop_id: shop_id}).select('id', 'shop_id', 'purchase_date').then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_statuses').innerJoin('statuses', 'status_id', 'statuses.id').where({'purchases_statuses.purchase_id': purchase.id}).whereNot({'purchases_statuses.completed': true}).select('purchase_id', 'name', 'status_id', 'created_at', 'updated_at', 'purchases_statuses.staff_id').first().then(status => {
        purchase.statuses = status
        return purchase
      })
    })
    return Promise.all(promises)
  }).then(currentStatus => {
    return createStatusList(currentStatus)
  })
}

function newPurchases(shop_id) {
  let pendingStatuses = 0
  return purchaseStatuses(shop_id)
  .then(statuses => {
    if (statuses.length === undefined) {
      throw {
        status : 400,
        message: 'No purchases exists'
      }
    }
    pendingStatuses = statuses[1].statusCount
    return pendingStatuses
  })
}

function productionPurchases(shop_id) {
  let inProductionStatus = 0
  return purchaseStatuses(shop_id).then(statuses => {
    const statuseses = Object.entries(statuses).map(ele => {
      if (typeof(ele) === 'object' && ele[1].status_id !== 1) {
        inProductionStatus += ele[1].statusCount
        return inProductionStatus
      }
    })
    return inProductionStatus
  })
}

function totalPurchases(shop_id) {
  return knex('purchases').where({shop_id: shop_id}).then(data => {
    return data.length
  })
}

function completedPurchases(shop_id) {
  let inProduction = 0
  let purchaseTotal = 0
  return totalPurchases(shop_id).then(total => {
    purchaseTotal = total
    return purchaseStatuses(shop_id)
  }).then(statuses => {
    const statuseses = Object.entries(statuses).map(ele => {
      if (typeof(ele) === 'object') {
        inProduction += ele[1].statusCount
        return inProduction
      }
    })
    return inProduction
  }).then(data => {
    return purchaseTotal - inProduction
  })
}

function purchasesHistory(shop_id) {
  return knex('purchases').where({shop_id: shop_id}).then(purchases => {
    return purchaseTimes(purchases)
  }).then(times => {
    return times
  })
}

/////////////////////////////////////////////////////////////////////////////////////////////
////////HELPER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////
function purchaseTimes(purchases) {
  return purchases.reduce((acc, ele) => {
    if (ele !== undefined && acc.hasOwnProperty(ele.purchase_date)) {
      acc[ele.purchase_date].purchaseAmount += 1
    } else if (ele !== undefined) {
      acc[ele.purchase_date] = ele
      acc[ele.purchase_date].purchaseAmount = 1
    }
    return acc
  }, {})
}

function createStatusList(list) {
  return list.map(list => list.statuses).reduce((acc, ele) => {
    if (ele !== undefined && acc.hasOwnProperty(ele.status_id)) {
      acc[ele.status_id].statusCount += 1
    } else if (ele !== undefined) {
      acc[ele.status_id] = ele
      acc[ele.status_id].statusCount = 1
    }
    return acc
  }, {})
}

module.exports = {
  purchaseStatuses,
  newPurchases,
  productionPurchases,
  totalPurchases,
  completedPurchases,
  purchasesHistory
}
