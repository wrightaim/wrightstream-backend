const express = require('express')
const router = express.Router()
const itemsController = require('../../controllers/products/items')

router.get('/:item_id', itemsController.getOneItem)
router.get('/:shop_id/allItems', itemsController.getAllItems)
router.get('/:shop_id/allArchivedItems', itemsController.getAllArchivedItems)
router.post('/:shop_id', itemsController.createItems)
router.put('/:item_id', itemsController.updateItems)

module.exports = router
