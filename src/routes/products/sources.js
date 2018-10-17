const express = require('express')
const router = express.Router()
const sourcesController = require('../../controllers/products/sources')

router.get('/:shop_id/allSources', sourcesController.getAllSources)
router.post('/:shop_id', sourcesController.createSource)
router.get('/:source_id', sourcesController.getOneSource)
router.put('/:source_id', sourcesController.updateSource)
router.delete('/:source_id', sourcesController.removeSource)

module.exports = router
