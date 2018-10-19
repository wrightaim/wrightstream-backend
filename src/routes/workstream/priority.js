const express = require('express')
const router = express.Router()
const purchasesController = require('../../controllers/workstream/priority')

router.get('/:shop_id', purchasesController.getAllPriority)
router.put('/:shop_id/', purchasesController.updatePriority)
router.delete('/:shop_id/:priority_type/:purchase_id', purchasesController.removePriority)


module.exports = router
