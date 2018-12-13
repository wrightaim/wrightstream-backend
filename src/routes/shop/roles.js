const express = require('express')
const router = express.Router()
const roleController = require('../../controllers/shop/roles')

router.get('/', roleController.getAllRoles)

module.exports = router
