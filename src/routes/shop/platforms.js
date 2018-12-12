const express = require('express')
const router = express.Router()
const platformController = require('../../controllers/shop/platforms')

router.get('/', platformController.getAllPlatforms)

module.exports = router
