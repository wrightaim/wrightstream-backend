const express = require('express')
const router = express.Router()
const kindsController = require('../../controllers/products/kinds')

router.get('/:shop_id/allKinds', kindsController.getAllKinds)
router.post('/:shop_id', kindsController.createKinds)
router.get('/:kind_id', kindsController.getOneKind)
router.put('/:kind_id', kindsController.updateKinds)
router.delete('/:kind_id', kindsController.removeKinds)

module.exports = router
