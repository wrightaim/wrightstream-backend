const authEtsyModel = require('../../models/shop/authEtsy')
const shopModel = require('../../models/shop/shops')
const db = require('../../../db')

async function getLogin(req, res, next){
  try{
    const request_token = await authEtsyModel.getOAuthRequestToken(req.claim.shop_id)
    const [ updatedStore ] = await db('stores')
                                  .update({token_secret: request_token.tokenSecret})
                                  .where({shop_id: req.claim.shop_id})
                                  .andWhere({ platform_id: 1})
                                  .returning('*')

    if(req.claim.role_id !== 1){
      return next({status:403, message: "Not admin"})
    }
    else if(updatedStore.access_token && updatedStore.access_token_secret) {
      return res.status(200).send({loginUrl: '' })
    }
    else {
      return res.status(200).send({loginUrl: request_token.options.login_url })
    }
  }
  catch(err){
    next(err)
  }
}


async function etsyRequestToken(req, res, next){
  try {
    const shop_id = req.claim.shop_id
    const { oauth_token, oauth_verifier } = req.body

    const { access_token, access_token_secret } = await authEtsyModel
                                                     .getOAuthAccessToken(shop_id, oauth_token, oauth_verifier)

    const shop = await authEtsyModel.setAccessToken(shop_id, access_token, access_token_secret)
    return res.sendStatus(200)
  }
  catch(err){
    next(err)
  }
}

async function withEtsyTokens(req, res, next){

  try{
    const { shop_id } = req.claim
    const { access_token, access_token_secret } = await db('stores')
                       .where({ shops_id })
                       .andWhere({platform_id: 1})
                       .first()

    if(!access_token && !access_token_secret){
      return next({ status: 403, message: 'Etsy Access Tokens Not Available' })
    }

    req.etsyTokens = { access_token, access_token_secret }

    next()
  }
  catch(err){
    next(err)
  }
}



module.exports = {
  getLogin,
  etsyRequestToken,
  withEtsyTokens
}
