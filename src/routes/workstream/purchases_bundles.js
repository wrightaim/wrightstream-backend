const express = require('express')
const router = express.Router()
const purchaseBundlesController = require('../../controllers/workstream/purchases_bundles')

router.get('/:purchase_id/all_purchase_bundles', purchaseBundlesController.getAllPurchaseBundles)
router.post('/:purchase_id', purchaseBundlesController.createPurchaseBundle)
router.get('/:purchase_id/:bundle_id', purchaseBundlesController.getOnePurchaseBundle)
router.put('/:purchase_id/:bundle_id', purchaseBundlesController.updatePurchaseBundle)
router.delete('/:purchase_id/:bundle_id', purchaseBundlesController.removePurchaseBundle)


module.exports = router
