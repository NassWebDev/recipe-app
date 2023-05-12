const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.postUsers = catchAsync(async (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route does not exist yet.'
    })
})

exports.getUsers = catchAsync(async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json({
        status: 'success',
        length: users.length,
        users
    })
})

exports.getUserByID = catchAsync(async (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route does not exist yet.'
    })
})

exports.editUserByID = catchAsync(async (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route does not exist yet.'
    })
});

exports.deleteUserByID = catchAsync(async (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route does not exist yet.'
    })
});