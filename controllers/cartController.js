const Cart = require('../models/Cart');
const catchAsync = require('../utils/catchAsync');

exports.addProductCart = catchAsync(async (req, res) => {
    const carts = await Cart.find();
    let cart = null;
    let cartBody = {
        user: '',
        products: []
    };
    carts.forEach(value => {
        if (value.user === req.user._id.toString() && value.status === 'PENDING'){
            cart = value;
        }
    });
    if (cart){
        cart.products.push(req.body.product);
        await Cart.findByIdAndUpdate(cart._id.toString(), cart);
    }else{
        cartBody.user = req.user._id.toString();
        cartBody.products.push(req.body.product);
        cart = await Cart.create(cartBody);
    }
    res.status(200).json({
        status: "success",
        data: {
            cart
        },
    });
});

exports.deleteCartById = catchAsync(async (req, res) =>{
    const carts = await Cart.find();
    let cart = null;
    let message = '';
    let status = 404;
    carts.forEach(value => {
        if (value.user === req.user._id.toString() && value.status === 'PENDING'){
            cart = value;
        }
    });
    if (cart){
        if (cart.products.length){
            let flag = false;
            cart.products.forEach((value,key) => {
                console.log(value.idProduct === req.params.id);
                console.log(value.idProduct, req.params.id, key);
                if (value.idProduct === req.params.id){
                    cart.products.splice(key, 1)
                    flag = true;
                }

            });
            if (flag){
                await Cart.findByIdAndUpdate(cart._id.toString(), cart);
                status = 200;
                message = 'Producto eliminado con exito';
            }else{
                message = 'No tiene asignado el producto';
            }
        }else{
            message = 'El carrito de compras esta vacio'
        }
    } else {
        message = 'No tiene asignado un carrito de compras'
    }
    res.status(status).json({
        status: status,
        message: message
    });
});

exports.buyCart = catchAsync(async (req, res) =>{
    const carts = await Cart.find();
    let cart = null;
    let status = 404;
    let message = null;
    carts.forEach(value => {
        if (value.user === req.user._id.toString() && value.status === 'PENDING'){
            cart = value;
        }
    });
    if (cart){
        if (cart.products.length > 0){
            cart.status = 'PAID';
            await Cart.findByIdAndUpdate(cart._id.toString(), cart);
            status = 200;
            message = 'Carrito comprado con exito';
        }else{
            message = 'No tiene productos añadidos al carrito';
        }
    }else{
        message = 'No tiene ningun carrito en PENDING';
    }
    res.status(status).json({
        status: status,
        message: message
    });
});