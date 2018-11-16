const express = require('express')
const router = express.Router()
const purchasesController = require('../../controllers/workstream/recraft')

router.get('/:shop_id/all_recrafts', purchasesController.getAllRecrafts)
router.post('/:shop_id/:purchase_id', purchasesController.createRecraft)
router.get('/:recraft_id', purchasesController.getOneRecraft)
router.put('/:recraft_id', purchasesController.updateRecraft)
router.delete('/:recraft_id', purchasesController.removeRecraft)


module.exports = router
