const OrderModel = require('../models/orderModel');

const placeOrder = async (req, res) => {
    try {
        const { userId, products, totalAmount, address } = req.body;

        const newOrder = await OrderModel.create({
            userId,
            products,
            totalAmount,
            address,
            status: "placed"
        });

        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully", 
            order: newOrder 
        });
    } catch (err) {
        console.error('Error placing order:', err);
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ 
                success: false,
                 message: "Order not found" 
                });
        }

        res.status(200).json({ 
            success: true, 
            message: "Order status updated", 
            order: updatedOrder 
        });
    } catch (err) {
        console.error('Error updating order status:', err);
    }
};

const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await OrderModel.find({ userId }).populate('products.productId');

        res.status(200).json({ 
            success: true, 
            orders: orders 
        });
    } catch (err) {
        console.error('Error getting user orders:', err);
    }
};

module.exports = {
    placeOrder,
    updateOrderStatus,
    getUserOrders
};
