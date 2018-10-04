const express = require('express')
const router = express.Router()
const categoryController = require('../../controllers/products/categories')

router.get('/:category_id', categoryController.getOneCategory)
router.get('/:shop_id/allCategories', categoryController.getAllCategories)
router.post('/:shop_id', categoryController.createCategories)
router.put('/:category_id', categoryController.updateCategories)
router.delete('/:category_id', categoryController.removeCategories)

module.exports = router
