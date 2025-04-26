const mongoose = require('mongoose');

const product = {
    productId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "ProductsModel"
    },
    qty:{
        type: Number,
        required: true,
        default: 1
    }
}

const CartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "userModel"
    },
    products:{
        type: [product],
        required: true,
    }
});

const CartModel = mongoose.model("CartModel", CartSchema);
module.exports = CartModel;