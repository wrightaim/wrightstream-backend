const express = require('express')
const router = express.Router()
const typeController = require('../../controllers/products/types')

router.get('/:shop_id/allTypes', typeController.getAllTypes)
router.post('/:shop_id', typeController.createTypes)
router.get('/:type_id', typeController.getOneType)
router.put('/:type_id', typeController.updateTypes)
router.delete('/:type_id', typeController.removeTypes)

module.exports = router
