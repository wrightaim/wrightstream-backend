const express = require('express')
const router = express.Router()
const bundlesController = require('../../controllers/Products/bundles')

router.get('/:bundle_id', bundlesController.getOneBundle)
router.get('/:shop_id/allBundles', bundlesController.getAllBundles)
router.get('/:shop_id/allArchivedBundles', bundlesController.getAllArchivedBundles)
router.post('/:shop_id', bundlesController.createBundles)
router.put('/:bundle_id', bundlesController.updateBundles)

module.exports = router
