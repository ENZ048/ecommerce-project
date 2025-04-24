const productsModel = require('../models/productsModel');

const fetchProductList = async (req, res) => {
    try {

        let pageSize = req.query.pageSize || 10;
        let pageNumber = req.query.pageNumber || 1;
        const searchKey = req.query.searchKey || "";

        const searchQuery = {
            $or: [
                {
                    title: new RegExp(searchKey, "gi")
                },
                {
                    description: new RegExp(searchKey, "gi")
                },
                {
                    brand: new RegExp(searchKey, "gi")
                },
                {
                    tags: {
                        $in: [searchKey]
                    }
                }
            ]
        }

        const itemsToSkip = (pageNumber - 1) * 10;

        let productsList = await productsModel.find(searchQuery, { title: 1, price: 1, category: 1, description: 1, rating: 1, brand: 1 }).skip(itemsToSkip).limit(pageSize);

        const totalProducts = await productsModel.find().countDocuments();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            totalProducts: totalProducts,
            data: productsList
        })
    }
    catch (err) {
        console.log('Error in fetching products list', err);
    }
}
const fetchProduct = async (req, res) => {
    try {

        let productId = req.params.id;

        let product = await productsModel.findById(productId);

        if (!product) {
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
    catch (err) {
        console.log('Error in fetching product', err);
    }
}
const creatProduct = async (req, res) => {
    try {

        let data = await productsModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: data
        })
    }
    catch (err) {
        console.log('Error in creating product', err);
    }
}
const updateProduct = async (req, res) => {
    try {

        let productId = req.params.id;
        let feildToUpdate = req.body;

        let productToUpdate = await productsModel.findById(productId);

        if (!productToUpdate) {
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
    catch (err) {
        console.log('Error in updating product', err);
    }
}
const deleteProduct = async (req, res) => {
    try {

        let productId = req.params.id;

        let productToDelete = await productsModel.findById(productId);

        if (!productToDelete) {
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
    catch (err) {
        console.log('Error in deleting product', err);
    }
}

module.exports = { fetchProductList, fetchProduct, creatProduct, updateProduct, deleteProduct };