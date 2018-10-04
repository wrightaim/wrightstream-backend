const express = require('express')
const router = express.Router()
const suppliesController = require('../../controllers/products/supplies')

router.get('/:shop_id/allSupplies', suppliesController.getAllSupplies)
router.post('/:shop_id', suppliesController.createSupplies)
router.get('/:supplies_id', suppliesController.getOneSupply)
router.put('/:supplies_id', suppliesController.updateSupplies)

module.exports = router
