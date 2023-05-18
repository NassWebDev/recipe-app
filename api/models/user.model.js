const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required:[true, 'Ajouter un pseudo'],
            minlength: [5, 'Ajouter au moins 5 caractères']
        },
        email: {
            type: String,
            unique: true,
            required:[true, 'Ajouter un email'],
            lowercase: true,
            validate: {
                validator: (value) => /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/.test(value),
                message: 'Format invalide',
            },
        },
        photo: {
            type: String
        },
        password: {
            type: String,
            required:[true, 'Ajouter un mot de passe'],
            minlength: 8,
            select: false
        },
        passwordConfirm: {
            type: String,
            required:[true, 'Confirmer votre mot de passe']
        },
    }
);

userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model("user", userSchema)