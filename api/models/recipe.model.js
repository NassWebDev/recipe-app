const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Ajouter un nom']
        },
        description: {
            type: String,
            required: [true, 'Ajouter une description']
        },
        ingredients: {
            type: [String],
            required: [true, 'Ajouter au moins un ingrédient']
        },
        user_id:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("recipe", recipeSchema);