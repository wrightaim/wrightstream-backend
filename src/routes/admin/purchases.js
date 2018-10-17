const express = require('express')
const router = express.Router()
const purchaseController = require('../../controllers/admin/purchases')

router.get('/purchases_status/:shop_id', purchaseController.purchaseStatuses)
router.get('/new_purchases/:shop_id', purchaseController.newPurchases)
router.get('/production_purchases/:shop_id', purchaseController.productionPurchases)
router.get('/total_purchases/:shop_id', purchaseController.totalPurchases)
router.get('/completed_purchases/:shop_id', purchaseController.completedPurchases)
router.get('/purchase_history/:shop_id', purchaseController.purchasesHistory)

module.exports = router
