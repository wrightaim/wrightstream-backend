const express = require('express')
const router = express.Router()
const inventoryController = require('../../controllers/inventory/inventory')

router.get('/:shop_id/supplies', inventoryController.getAllInventorySupplies)
router.get('/:shop_id/products', inventoryController.getAllInventoryProducts)

module.exports = router
