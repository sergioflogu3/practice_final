const express = require('express');
const cartController = require('./../controllers/cartController');
const cartRouter = express.Router();
const authController = require('./../controllers/authController');

//routes
cartRouter
    .route('/')
    .all(authController.protect)
    .post(cartController.addProductCart);

cartRouter
    .route('/:id')
    .all(authController.protect)
    .delete(cartController.deleteCartById);

cartRouter
    .route('/buy')
    .all(authController.protect)
    .put(cartController.buyCart);

module.exports = cartRouter;