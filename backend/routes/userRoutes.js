const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const itemController = require("../controllers/itemController");

router.post('/', userController.createUser);
router.get('/', userController.getUsers );
router.delete('/:id', userController.deleteUser);
router.get('/:username', userController.getUser );
router.put('/:id',userController.updateUser);
router.post('/comments',userController.updateComment);
router.post('/login', userController.userLogin);
router.get('/rating/:username', userController.averageRating);
router.delete('/comments/:username/:item', userController.deleteComment);

//router.get('/comments/:username',userController.getComments);

module.exports = router;