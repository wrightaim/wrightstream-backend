const {etsyOAuth} = require('../../../config/oauth.js')
const knex = require('../../../db');
const etsyModel = require('../../models/shop/etsy')

function getSelf(req, res, next) {
  const { access_token, access_token_secret } = req.etsyTokens
  etsyModel.getSelf(access_token, access_token_secret)
  .then(response => {
    res.send(response)
  })
  .catch(next)
}

function AllListingActive(req, res, next) {
  const shop_id = req.claim.shop_id
  const { access_token, access_token_secret } = req.etsyTokens
  etsyModel.AllListingActive(access_token, access_token_secret, shop_id)
  .then(response => {
    res.send(response)
  })
  .catch(next)
}


function findAllPurchases(req, res, next) {
  const shop_id = req.claim.shop_id
  const { access_token, access_token_secret } = req.etsyTokens
  etsyModel.findAllPurchases(access_token, access_token_secret, shop_id)
  .then(response => {
    res.send(response)
  })
  .catch(next)
}

module.exports = {
  getSelf,
  AllListingActive,
  findAllPurchases
