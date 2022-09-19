const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'PENDING',
        required: true
    },
    products: [
        {
            idProduct: String,
            price: Number,
            amount: Number
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;