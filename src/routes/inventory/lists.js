const express = require('express')
const router = express.Router()
const listController = require('../../controllers/inventory/lists')

router.get('/:list_id', listController.getOneList)
router.get('/:shop_id/all_lists', listController.getAllLists)
router.delete('/:list_id', listController.removeList)
router.post('/:shop_id', listController.createList)


module.exports = router
