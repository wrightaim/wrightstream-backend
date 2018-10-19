const express = require('express')
const router = express.Router()
const purchasesController = require('../../controllers/workstream/purchases')

router.get('/:shop_id/all_purchases', purchasesController.getAllPurchases)
router.post('/:shop_id', purchasesController.createPurchases)
router.get('/:purchase_id', purchasesController.getOnePurchase)
router.put('/:purchase_id', purchasesController.updatePurchases)
router.delete('/:purchase_id', purchasesController.removePurchases)


module.exports = router
