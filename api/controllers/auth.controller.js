const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = ((id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
})

exports.signUp = catchAsync(async (req, res) => {

    const { username, email, password, passwordConfirm } = req.body

    const newUser = await UserModel.create(
        {
            username,
            email,
            password,
            passwordConfirm
        }
    );

    const token = signToken(newUser._id);
        
    res.status(200).json({
        email,
        token
    })
})

exports.login = catchAsync(async(req, res, next) => {
    const { email, password} = req.body;

    if(!email || !password){
        return next(new AppError("Please provide email and password", 400))
    }

    const user = await UserModel.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError("Incorrect email or password", 401))
    }

    const token = signToken(user._id);
    res.status(200).json({
        email,
        token
    })
});

exports.protect = catchAsync(async (req, res, next) => {
    if(!req.headers.authorization){
        return next(new AppError("Vous ne posséder pas les droits, veuillez vous connecter", 401));
    }
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);

    const {id} = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(id);
    next();
    // console.log(req.user);
})