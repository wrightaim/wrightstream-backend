const express = require('express')
const router = express.Router()
const authController = require('../../controllers/shop/auth')
const authEtsyController = require('../../controllers/shop/authEtsy')
const etsyController = require('../../controllers/shop/etsy')


router.get('/self', authController.isAuthenticated, authEtsyController.withEtsyTokens, etsyController.getSelf)
router.get('/findAllListingActive', authController.isAuthenticated, authEtsyController.withEtsyTokens, etsyController.AllListingActive)
router.get('/findAllPurchases', authController.isAuthenticated, authEtsyController.withEtsyTokens, etsyController.findAllPurchases)
module.exports = router
