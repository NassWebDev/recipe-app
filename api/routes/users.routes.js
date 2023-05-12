const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')

router
    .route('/')
    .get(usersController.getUsers)
    .post(usersController.postUsers)

router
    .route('/:id')
    .get(usersController.getUserByID)
    .patch(usersController.editUserByID)
    .delete(usersController.deleteUserByID)

module.exports = router;