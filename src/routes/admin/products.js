const express = require('express')
const router = express.Router()
const productController = require('../../controllers/admin/products')

router.get('/item_qty/:shop_id', productController.getItemQTY)
router.get('/bundle_qty/:shop_id', productController.getBundleQTY)
router.get('/total_product_sold/:shop_id', productController.getTotalProductSold)
router.get('/total_bundle_sold/:shop_id', productController.getTotalBundleSold)
router.get('/total_item_sold/:shop_id', productController.getTotalItemSold)


module.exports = router
