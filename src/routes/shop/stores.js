const express = require('express')
const router = express.Router()
const storeController = require('../../controllers/shop/stores')

router.get('/:shop_id/allStores', storeController.getAllStore)
router.get('/:store_id', storeController.getOneStore)
router.post('/:shop_id', storeController.createStore)
router.put('/:store_id', storeController.updateStore)
router.delete('/:store_id', storeController.removeStore)


module.exports = router
