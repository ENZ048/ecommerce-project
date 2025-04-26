const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "userModel",
        unique: true  // one wishlist per user
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "ProductsModel",
                required: true
            }
        }
    ]
}, { timestamps: true });

const WishlistModel = mongoose.model("WishlistModel", WishlistSchema);
module.exports = WishlistModel;
