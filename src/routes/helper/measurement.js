const express = require('express')
const router = express.Router()
const measurementController = require('../../controllers/helper/measurement')

router.get('/volume', measurementController.volume)
router.get('/length', measurementController.length)
router.get('/mass', measurementController.mass)
router.get('/wright_stream/:shop_id', measurementController.wrightStream)
router.post('/compare_order/:shop_id', measurementController.orderPredictor)
router.post('/product_predictor/:shop_id', measurementController.suppliesPredictor)


module.exports = router
