const mongoose = require('mongoose');

const productSchema = {
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "ProductsModel",
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    }
};

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    products: {
        type: [productSchema],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "placed", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

const OrderModel = mongoose.model('OrderModel', orderSchema);
module.exports = OrderModel;
