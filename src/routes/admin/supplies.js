const express = require('express')
const router = express.Router()
const suppliesController = require('../../controllers/admin/supplies')

router.get('/most_used/:shop_id', suppliesController.mostUsed)
router.get('/most_ordered/:shop_id', suppliesController.mostOrdered)

module.exports = router
