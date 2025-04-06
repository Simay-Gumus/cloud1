const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.post('/', itemController.createItem);
router.delete('/:id', itemController.deleteItem);
router.get('/', itemController.getItems );
router.get('/:id',itemController.getItem)
router.put('/:id',itemController.updateItem)
router.get('/type/:itemType',itemController.getItemsByCategory)
router.get('/comments/:id',itemController.getCommentsByItemId)
//router.delete('/comments/:username/:item', itemController.deleteComment);
router.get('/average/:id',itemController.getAverageRating)


module.exports = router;