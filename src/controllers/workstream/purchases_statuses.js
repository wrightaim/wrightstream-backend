const express = require('express')
const router = express.Router()
const measurementController = require('../../controllers/helper/measurement')


router.get('/volume', measurementController.volume)
router.get('/length', measurementController.length)
router.get('/mass', measurementController.mass)
router.get('/wrightstream/:shop_id', measurementController.wrightStream)
router.post('/order_predictor', measurementController.orderPredictor)
router.post('/compare_order/:shop_id', measurementController.compareOrderPredictor)


module.exports = router
