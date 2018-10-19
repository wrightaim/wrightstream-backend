const express = require('express')
const router = express.Router()
const purchaseItemsController = require('../../controllers/workStream/purchases_items')

router.get('/:purchase_id/all_purchase_items', purchaseItemsController.getAllPurchaseItem)
router.post('/:purchase_id', purchaseItemsController.createPurchaseItem)
router.get('/:purchase_id/:item_id', purchaseItemsController.getOnePurchaseItem)
router.put('/:purchase_id/:item_id', purchaseItemsController.updatePurchaseItem)
router.delete('/:purchase_id/:item_id', purchaseItemsController.removePurchaseItem)


module.exports = router
