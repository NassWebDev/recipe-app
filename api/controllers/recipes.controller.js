const mongoose = require('mongoose');
const RecipeModel = require('../models/recipe.model')

module.exports.postRecipes = (async (req, res) => {
    if (!req.body.name && !req.body.description && !req.body.ingredients){
        res.status(400).json({
            message: "Veuillez remplir tout les champs."
        })
    }

    const recipe = await RecipeModel.create({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients
    })

    res.status(200).json(recipe)
})

module.exports.getRecipes = (async (req, res) => {
    const recipes = await RecipeModel.find();
    res.status(200).json(recipes)
})

module.exports.getRecipeByID = (async (req, res) => {
    await RecipeModel.findById(req.params.id).then((recipe) => {
        res.status(200).json(recipe)
    }).catch((err) => {
        res.status(400).json({
            message: "La recette n'existe pas."
        })
    })
})

module.exports.editRecipeByID = async (req, res) => {
    const recipe = await RecipeModel.findById(req.params.id);
  
    if (!recipe) {
        res.status(400).json({
            message: "Cette recette n'existe pas"
        });
    }
  
    const updateRecipe = await RecipeModel.findByIdAndUpdate(recipe, req.body, {
      new: true,
    });
  
    res.status(200).json(updateRecipe);
  };

module.exports.deleteRecipeByID = (async (req, res) => {
    const recipe = await RecipeModel.findById(req.params.id)
    
    if(!recipe){
        res.status(400).json({
            message: "Cette recette n'existe pas."
        })
    }

    await RecipeModel.deleteOne(recipe);
    res.status(200).json({
        message: "Test supprimé"
    })
});