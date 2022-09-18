const crypto = require('crypto');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const Product = require("../models/Product");

exports.addUser = catchAsync(async (req, res) => {
    req.body.password = crypto
        .createHash('sha256')
        .update(req.body.password)
        .digest('hex');

    let newUser = await User.create(req.body);
    newUser = newUser.toObject();
    delete newUser.password;

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: users.length,
        data: {
            users,
        },
    });
});

exports.getUserById = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json({
            status: "success",
            data: {
                user
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
});

exports.updatedUserById = catchAsync(async (req, res) => {
    await User.findOneAndUpdate(req.params.id, req.body);
    res.status(201).json({
        status: "success",
        message: 'Usuario modificado con exito'
    });
});

exports.deleteUserById = catchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (user){
        res.status(204).json({
            status: "success",
            message: 'Usuario eliminado con exito'
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
});
