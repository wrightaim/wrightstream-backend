const OAuth = require('oauth')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load()
}

module.exports.etsyOAuth = new OAuth.OAuth(
'https://openapi.etsy.com/v2/oauth/request_token?scope=email_r%20profile_r%20profile_w%20address_r%20address_w%20listings_r%20transactions_r',
'https://openapi.etsy.com/v2/oauth/access_token',
process.env.ETSY_CONSUMER_KEY,
process.env.ETSY_CONSUMER_SECRET,
'1.0',
process.env.ETSY_CALLBACK_URL,
'HMAC-SHA1')
