const express = require('express')
const router = express.Router()
const purchasesController = require('../../controllers/workstream/comments')

router.get('/:purchase_id/all_comments', purchasesController.getAllComments)
router.post('/:purchase_id', purchasesController.createComment)
router.get('/:comment_id', purchasesController.getOneComment)
router.put('/:comment_id', purchasesController.updateComment)
router.delete('/:comment_id', purchasesController.removeComment)


module.exports = router
