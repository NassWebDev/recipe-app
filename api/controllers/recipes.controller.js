const mongoose = require('mongoose');
const RecipeModel = require('../models/recipe.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


module.exports.postRecipes = catchAsync(async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.ingredients){
        return next(new AppError("Veuillez remplir tout les champs", 400));
    }

    const user_id = req.user.id;
    const recipe = await RecipeModel.create({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        user_id: user_id
    })

    res.status(200).json(recipe)
})

module.exports.getRecipes = catchAsync(async (req, res) => {
    const user_id = req.user.id;
    const recipes = await RecipeModel.find({user_id}).sort({createdAt: -1});
    res.status(200).json(recipes);
})

module.exports.getRecipeByID = catchAsync(async (req, res) => {
    const recipe = await RecipeModel.findById(req.params.id)
    res.status(200).json(recipe)

    return next(new AppError("La recette n'existe pas", 400));
})

module.exports.editRecipeByID = catchAsync(async (req, res) => {
    const recipe = await RecipeModel.findById(req.params.id);
  
    if (!recipe) {
        return next(new AppError("La recette n'existe pas", 400));
    }
  
    const updateRecipe = await RecipeModel.findByIdAndUpdate(recipe, req.body, {
      new: true,
    });
  
    res.status(200).json(updateRecipe);
});

module.exports.deleteRecipeByID = catchAsync(async (req, res) => {
    const recipe = await RecipeModel.findById(req.params.id)
    
    if(!recipe){
        return next(new AppError("La recette n'existe pas", 400));
    }

    await RecipeModel.deleteOne(recipe);
    res.status(200).json({
        message: "Recette supprimée"
    })
});