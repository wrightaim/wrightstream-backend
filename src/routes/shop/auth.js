const express = require('express')
const router = express.Router()
const authController = require('../../controllers/shop/auth')

router.get('/token', authController.isAuthenticated, authController.getAuthStatus)
router.post('/token', authController.login)

module.exports = router
