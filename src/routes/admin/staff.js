const express = require('express')
const router = express.Router()
const staffController = require('../../controllers/admin/staff')

router.get('/current_staff/:shop_id', staffController.getCurrentStaff)
router.get('/past_staff/:shop_id', staffController.getPastStaff)
router.get('/total_staff/:shop_id', staffController.totalStaff)
router.get('/current_working_staff/:shop_id', staffController.currentWorkingStaff)

module.exports = router
