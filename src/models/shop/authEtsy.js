const db = require('../../../db')
const { etsyOAuth } = require('../../../config/oauth.js')

function getOAuthRequestToken(shop_id){
  return new Promise((resolve, reject) => {
    etsyOAuth.getOAuthRequestToken(function(err, token, token_secret, options){
      if(err) return reject(err)
      resolve({token, token_secret, options})
    })
  })
  .catch(err => {
    throw err
  })
}

async function getOAuthAccessToken(shop_id, request_token, requestVerifier){
  try{
    const shop = await db('stores').where({shop_id}).andWhere({platform_id: 1}).first()
    return new Promise((resolve, reject) => {
      etsyOAuth.getOAuthAccessToken(request_token, shop.tokenSecret, requestVerifier,
        function(err, oauth_access_token, oauth_access_token_secret, results) {
          if(err) return reject(err)
          resolve({ accessToken: oauth_access_token, accessTokenSecret: oauth_access_token_secret})
        })
      }
    ).catch(err => {
      throw err
    })
  }
  catch(err){
    throw err
  }
}

function setAccessToken(shop_id, access_token, access_token_secret){
  return db('stores')
  .update({ access_token, access_token_secret })
  .where({ shop_id })
  .andWhere({ platform_id: 1 })
  .returning('*')
  .then(([data]) => {
    return data
  })
}

module.exports = {
  getOAuthRequestToken,
  getOAuthAccessToken,
  setAccessToken
}
