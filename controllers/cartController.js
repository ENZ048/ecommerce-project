const CartModel = require('../models/cartModel');

const addToCart = async (req, res) => {
    try{
        const user = await CartModel.findOne({userId: req.body.userId});

        if(user){

            const newProduct = {
                productId: req.body.product.productId,
                qty: req.body.product.qty
            }

            await CartModel.findByIdAndUpdate(user._id, {
                $push:{
                    products: newProduct,
                }
            })
        }
        else{
            const newProduct = {
                productId: req.body.product.productId,
                qty: req.body.product.qty
            }

            await CartModel.create({
                products: [newProduct],
                userId: req.body.userId,
            })
        }

        res.status(200).json({
            success: true,
            message: "Products Added to the cart successfully!"
        })

    }
    catch(err){
        console.log('Error Adding to the cart', err);
    }
}

const fetchCart = async (req, res) => {
    try{

        const cart = await CartModel.findOne({userId: req.params.id})
        .populate("products.productId")
        .populate("userId");

        res.status(200).json({
            success: true,
            message: "Cart details fetched successfully!",
            data: cart
        })

    }
    catch(err){
        console.log('Error in fetching cart details', err);
    }
}

const updateCart = async (req, res) => {
    try{
        const user = await CartModel.findOne({userId: req.body.userId});

        await CartModel.updateOne({
            "products.productId": req.body.product.productId,
            userId: req.body.userId,
        },
        {
            $inc:{
                "products.$.qty": req.body.product.qty,
            }
        }
        )
       
        res.status(200).json({
            success: true,
            message: "Cart updated successfully!",
            data: user
        })

    }
    catch(err){
        console.log('Error in updating cart details', err);
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ 
                success: false, 
                message: "Cart not found" 
            });
        }

        const newProducts = cart.products.filter(
            (item) => item.productId.toString() !== productId
        );

        cart.products = newProducts;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart: cart
        });
    } catch (err) {
        console.error('Error removing product from cart:', err);
    }
};


module.exports = {addToCart, fetchCart, updateCart, removeFromCart};