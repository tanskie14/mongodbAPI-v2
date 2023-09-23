const asyncHandler = require('express-async-handler')
// Model
const Product = require('../model/productModel.js')

// Get All Products
const getProducts =  asyncHandler( async(req, res) => {
    try{
        let products = await Product.find();
        res.status(200).json(products)
    }catch(err) {
        res.status(500)
        throw new Error( err.message)
        // res.status(500).json({ message: err.message});
    }
})

// Get Specific Product
const getProduct = async(req, res) => {
    try{
        const { id } = req.params
        let products = await Product.findById(id);
        res.status(200).json(products)
    }catch(err) {
        res.status(500).json({ message: err.message});
    }
}

// Create Product
const createProduct = async( req,res) => {
    try{
       let product = await Product.create( req.body);
       res.status(200).json({
           data: product,
           message:'Successfully Saved Record'
       })
    }catch(err) {  
       res.status(500).json({ message: err.message});
    }
}

// Update Product
const updateProduct =  async( req,res) => {
    try{
       const { id } = req.params;
       let product = await Product.findByIdAndUpdate(id , req.body );
       if(!product) {
        return res.status(404).json({ message: `No Record Found ID: ${id}`})
       }
       const updatedProduct = await Product.findById( id )
       res.status(200).json({
           data: updatedProduct,
           message:'Successfully Update Record'
       })
    }catch(err) {  
       res.status(500).json({ message: err.message});
    }
}

const deleteProduct = async( req,res) => {
    try{
       const { id } = req.params;
       let product = await Product.findByIdAndDelete(id , req.body );
       if(!product) {
        return res.status(404).json({ message: `No Record Found ID: ${id}`})
       }
       res.status(200).json({
           data: product,
           message:'Successfully Delete Record'
       })
    }catch(err) {  
       res.status(500).json({ message: err.message});
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct

}