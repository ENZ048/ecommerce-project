const WishlistModel = require("../models/wishlistModel");


const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let wishlist = await WishlistModel.findOne({ userId });

        if (wishlist) {
            const productExists = wishlist.products.some(
                (item) => item.productId.toString() === productId
            );

            if (productExists) {
                return res.status(400).json({ success: false, message: "Product already in wishlist" });
            }

            wishlist.products.push({ productId });
            await wishlist.save();
        } else {
            wishlist = await WishlistModel.create({
                userId,
                products: [{ productId }]
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Product added to wishlist", 
            wishlist: wishlist 
        });
    } catch (err) {
        console.error('Error adding to wishlist:', err);
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const wishlist = await WishlistModel.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ 
                success: false, 
                message: "Wishlist not found" 
            });
        }

        wishlist.products = wishlist.products.filter(
            (item) => item.productId.toString() !== productId
        );

        await wishlist.save();

        res.status(200).json({ 
            success: true, 
            message: "Product removed from wishlist", 
            wishlist: wishlist 
        });
    } catch (err) {
        console.error('Error removing from wishlist:', err);
    }
};


const getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishlist = await WishlistModel.findOne({ userId }).populate('products.productId');

        if (!wishlist) {
            return res.status(404).json({ success: false, message: "Wishlist not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Wishlist fetched successfully',
            wishlist: wishlist 
        });
    } catch (err) {
        console.error('Error getting wishlist:', err);
    }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist};
