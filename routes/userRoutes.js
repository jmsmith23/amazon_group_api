const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listUsers);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.auth, userController.deleteUser);
