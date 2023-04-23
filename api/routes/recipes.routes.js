const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes.controller')

router
    .route('/')
    .get(recipesController.getRecipes)
    .post(recipesController.postRecipes)

router
    .route('/:id')
    .get(recipesController.getRecipeByID)
    .delete(recipesController.deleteRecipeByID)

module.exports = router;