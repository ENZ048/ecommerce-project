const productsModel = require('../models/productsModel');

const fetchProductList = async (req, res) => {
    try{

        let productsList = await productsModel.find();
        // console.log(productsList)

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: productsList
        })
    }
    catch(err){
        console.log('Error in fetching products list', err);
    }
}
const fetchProduct = async (req, res) => {
    try{

        let productId = req.params.id;

        let product = await productsModel.findById(productId);

        if(!product){
            res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        })
    }
    catch(err){
        console.log('Error in fetching product', err);
    }
}
const creatProduct = async (req, res) => {
    try{

        let data = await productsModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: data
        })
    }
    catch(err){
        console.log('Error in creating product');
    }
}
const updateProduct = async (req, res) => {
    try{

        let productId = req.params.id;
        let feildToUpdate = req.body;

        let productToUpdate = await productsModel.findById(productId);

        if(!productToUpdate){
            res.status(404).json({
                message: 'Product not found'
            })
        }

        let updatedProduct = await productsModel.findByIdAndUpdate(productId, feildToUpdate);

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        })
    }
    catch(err){
        console.log('Error in updating product', err);
    }
}
const deleteProduct = async (req, res) => {
    try{

        let productId = req.params.id;

        let productToDelete = await productsModel.findById(productId);

        if(!productToDelete){
            res.status(404).json({
                message: 'Product not found'
            })
        }

        await productsModel.findByIdAndDelete(productId);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch(err){
        console.log('Error in deleting product', err);
    }
}

module.exports = {fetchProductList, fetchProduct, creatProduct, updateProduct, deleteProduct};