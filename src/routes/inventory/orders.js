const express = require('express')
const router = express.Router()
const inventoryController = require('../../controllers/inventory/orders')

router.get('/:order_id', inventoryController.getOneOrder)
router.get('/:shop_id/all_orders', inventoryController.getAllOrders)
router.post('/:shop_id', inventoryController.createOrder)
router.put('/order/:order_id', inventoryController.updateOrder)
router.put('/order_supply/:order_id', inventoryController.updateOrderSupply)

module.exports = router
