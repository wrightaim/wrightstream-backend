const express = require('express')
const router = express.Router()
const authController = require('../../controllers/shop/auth')
const authEtsyController = require('../../controllers/shop/authEtsy')

router.get('/loginUrl', authController.isAuthenticated, authEtsyController.getLogin)
router.post('/token', authController.isAuthenticated, authEtsyController.etsyRequestToken)

module.exports = router
