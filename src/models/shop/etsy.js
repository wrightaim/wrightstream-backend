const {etsyOAuth} = require('../../../config/oauth.js')
const knex = require('../../../db');
// const purchaseModel = require('../WorkStream/purchases')
var moment = require('moment');

const getSelf = (access_token, access_token_secret) => {
  return new Promise((resolve, reject) => {
    etsyOAuth.get('https://openapi.etsy.com/v2/users/__SELF__', access_token, access_token_secret, function(err, data, response) {
      if (err)
        return reject(err)
      resolve(JSON.parse(data).results)
    })
  })
}

const AllListingActive = (access_token, access_token_secret, shop_id) => {
  let user_id;
  let storeId;
  let store_id;
  return findEtsyStore(shop_id)
  .then(store => {
    store_id = store.id
    return getSelf(access_token, access_token_secret)
  }).then(self => {
    user_id = self[0].user_id
    return getStore(user_id, access_token, access_token_secret)
  }).then(storeInfo => {
    storeId = storeInfo[0].shop_id
    return etsyOAuthGet(`/shops/${storeId}/listings/active`, access_token, access_token_secret)
  }).then(listing_data => {
    listing_data = listing_data.results
    const products = listing_data.map(productListing => {
      const product = {}
      product.listing_id = productListing.listing_id
      product.title = productListing.title
      product.quantity = productListing.quantity
      return new Promise((resolve, reject) => {
        etsyOAuth.get(`https://openapi.etsy.com/v2/listings/${productListing.listing_id}/images`, access_token, access_token_secret, function(err, data, response) {
          if (err)
            reject(err)
          const photoUrl = JSON.parse(data)
          product.photo = photoUrl.results.map(photos => photos.url_fullxfull)
          resolve(product)
        })
      })
    })
    return Promise.all(products)
  }).then(products => {
    return addProducts(products, store_id)
  })
}

// const findAllPurchases = function(accessToken, accesTokenSecret, shop_id){
//   let userId;
//   let storeId;
//   let wrightStore;
//   return findEtsyStore(shop_id).then(store => {
//     wrightStore = store.id
//     return getSelf(accessToken, accesTokenSecret)
//   }).then(self => {
//     userId = self[0].user_id
//     return getStore(userId, accessToken, accesTokenSecret)
//   }).then(storeInfo => {
//     storeId = storeInfo[0].shop_id
//     return etsyOAuthGet(`/shops/${storeId}/transactions`, accessToken, accesTokenSecret)
//   }).then(data => {
//     return createPurchaseList(data)
//   }).then(async function(purchaseList){
//     let listedPurchaseData = []
//     for (var receipt in purchaseList) {
//       const purchase = {}
//       let purchaseTime = moment.utc(purchaseList[receipt][0].creation_tsz * 1000)
//       purchaseTime = moment(purchaseTime).format();
//       purchase.receipt_id = purchaseList[receipt][0].receipt_id
//       purchase.shop_id = shop_id
//       purchase.store_id = wrightStore
//       purchase.purchase_date = purchaseTime
//       purchase.service = null
//       purchase.tracking = null
//       purchase.delivery_date = null
//       purchase.items = []
//       purchase.bundles = []
//       for(const transaction of purchaseList[receipt]){
//         let item = {}
//         let bundle = {}
//
//         const product = await knex('products').where({listing_id: transaction.listing_id})
//         if(product){
//           const items = await knex('items').where({product_id: product[0].id}).first()
//           if(items){
//             item.id = items.id
//             item.item_qty = transaction.quantity
//             purchase.items.push(item)
//           }
//           else{
//             const bundles = await knex('bundles').where({product_id: product[0].id}).first()
//             if(bundles){
//               bundle.id = bundles.id
//               bundle.bundle_qty = transaction.quantity
//               purchase.bundles.push(bundle)
//             }
//           }
//         }
//       }
//       listedPurchaseData.push(purchase)
//     }
//     const addedPurchases = listedPurchaseData.map(purchase => {
//       return addPurchases(purchase, wrightStore, shop_id)
//     })
//     return Promise.all(addedPurchases)
//   })
// }
//
// ///////////////////////////////////////////////////////////////////////////////////////////
// /////////Helper Functions
// //////////////////////////////////////////////////////////////////////////////////////////
const addProducts = (products, store_id) => {
const promises = products.filter(product => {
  return knex('products').where({store_id: store_id, listing_id: product.listing_id}).then(data => {
    if (!data || data.length < 1) {
      return (knex('products').insert({
        name: "Etsy",
        image: product.photo[0],
        listing_id: product.listing_id,
        quantity: product.quantity,
        title: product.title,
        store_id: store_id
      }))
    } else
      return
  })
})
return Promise.all(promises)
}

const addPurchases = (rawPurchases, wrightStore, shop_id) => {
let purchases = []
let items = []
let bundles = []
purchases.push(rawPurchases)
const promises = purchases.map(purchase => {
  return knex('purchases').where({store_id: shop_id, receipt_id: purchase.receipt_id}).then(data => {
    if (!data || data.length < 1) {
      return purchaseModel.createPurchases(wrightStore, shop_id, purchase.delivery_date, purchase.staff_id, purchase.purchase_date, purchase.receipt_id, purchase.service, purchase.tracking, purchase.items, purchase.bundles)
    } else
      return
  })
})
return Promise.all(promises)
}

const createPurchaseList = (EtsyTransactions) => {
let transactions = []
let products;
return EtsyTransactions.results.reduce((acc, ele) => {
  if (acc.hasOwnProperty(ele.receipt_id)) {
    acc[ele.receipt_id].push(ele)
  } else {
    acc[ele.receipt_id] = [ele]
  }
  return acc
}, {})
}

const findEtsyStore = (shop_id) => {
return knex('stores').where({shop_id, platform_id: 1}).first()
}


const getStore = (user_id, access_token, access_token_secret) => {
return new Promise((resolve, reject) => {
  etsyOAuth.get(`https://openapi.etsy.com/v2/users/${user_id}/shops`, access_token, access_token_secret, function(err, data, response) {
    if (err)
      return reject(err)
    resolve(JSON.parse(data).results)
  })
})
}

const etsyOAuthGet = (path, access_token, access_token_secret) => new Promise((resolve, reject) => {
etsyOAuth.get(`https://openapi.etsy.com/v2${path}`, access_token, access_token_secret, function(err, data, response) {
  if (err)
    return reject(err)
  resolve(JSON.parse(data))
})
})

module.exports = {
  getSelf,
  AllListingActive,
  findAllPurchases
