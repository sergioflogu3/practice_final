const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router();
const authController = require('./../controllers/authController')

//routes
productRouter
    .route("/")
    .all(authController.protect)
    .get(productController.getAllProducts)
    .post(productController.addProduct);
productRouter
    .route("/:id")
    .all(authController.protect)
    .get(productController.getProductById)
    .put(productController.updatedProductById)
    .delete(productController.deleteProductById);

module.exports = productRouter;