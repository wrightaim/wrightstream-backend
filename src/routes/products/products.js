const express = require('express')
const router = express.Router()
const productsController = require('../../controllers/products/products')

router.get('/:shop_id/allUnlinked', productsController.getAllUnlinked)
router.get('/:shop_id/allProducts', productsController.getAllProducts)


module.exports = router
