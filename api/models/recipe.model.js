const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ingredients: {
            type: [String],
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("recipe", recipeSchema);