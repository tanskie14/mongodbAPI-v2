const express = require('express');
const router = express.Router();

// Controller
const { 
    getProducts , 
    getProduct ,
    createProduct , 
    updateProduct , 
    deleteProduct 
} = require('../controller/productController.js');


router.get('/getProducts', getProducts);
router.get('/getProduct/:id', getProduct );
router.post('/addProduct', createProduct);
router.put('/updateProduct/:id', updateProduct );
router.delete('/deleteProduct/:id', deleteProduct );


module.exports = router;