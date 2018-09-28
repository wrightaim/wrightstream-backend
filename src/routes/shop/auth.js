const express = require('express')
const router = express.Router()
const authController = require('../../controllers/Shop/auth')

router.get('/token', authController.isAuthenticated, authController.getAuthStatus)
router.post('/token', authController.login)

module.exports = router
