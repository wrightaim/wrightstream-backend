const express = require('express')
const router = express.Router()
const storeController = require('../../controllers/shop/stores')

router.get('/all_stores/:shop_id/', storeController.getAllStore)
router.get('/:store_id', storeController.getOneStore)
router.delete('/:store_id', storeController.removeStore)


module.exports = router
