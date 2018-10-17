const express = require('express')
const router = express.Router()
const measurementController = require('../../controllers/helper/measurement')

router.get('/volume', measurementController.volume)
router.get('/length', measurementController.length)
router.get('/mass', measurementController.mass)
router.get('/wright_stream/:shop_id', measurementController.wrightStream)
router.post('/compare_order/:shop_id', measurementController.orderPredictor)


module.exports = router
