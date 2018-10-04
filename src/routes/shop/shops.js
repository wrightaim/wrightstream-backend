const express = require('express')
const router = express.Router()
const shopController = require('../../controllers/shop/shops')

//shop routes
router.get('/', shopController.getAllShops)
router.get('/:shop_id', shopController.getOneShop)
router.post('/', shopController.createShop)
router.put('/:shop_id', shopController.updateShop)
router.delete('/:shop_id', shopController.removeShop)

//staff routes
router.get('/:shop_id/staff/:staff_id', shopController.getOneStaff)
router.get('/:shop_id/staff', shopController.getAllStaff)
router.post('/:shop_id/staff', shopController.createStaff)
router.put('/:shop_id/staff/:staff_id', shopController.updateStaff)
router.delete('/:shop_id/staff/:staff_id', shopController.removeStaff)

module.exports = router
