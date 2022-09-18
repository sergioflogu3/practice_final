const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data: {
            products,
        },
    });
})

exports.addProduct = catchAsync(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            newProduct,
        },
    });
})

exports.getProductById = catchAsync(async (req, res) => {
    const foundProduct = await Product.findById(req.params.id);
    if (foundProduct) {
        res.status(200).json({
            status: "success",
            data: {
                product: foundProduct,
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
})

exports.updatedProductById = catchAsync(async (req, res) => {
    await Product.findOneAndUpdate(req.params.id, req.body);
    res.status(201).json({
        status: "success",
        message: 'Producto modificado con exito'
    });
})

exports.deleteProductById = catchAsync(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (product){
        res.status(204).json({
            status: "success",
            message: 'Producto eliminado con exito'
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
});