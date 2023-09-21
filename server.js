require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 4000;

// Model
const Product = require('./model/productModel.js')


app.use( express.json());
app.use( express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.status(200).json({ message: 'Welome to mongodb API'})
})


app.get('/getProducts', async(req, res) => {
    try{
        let products = await Product.find();
        res.status(200).json(products)
    }catch(err) {
        res.status(500).json({ message: err.message});
    }
})


app.get('/getProduct/:id', async(req, res) => {
    try{
        const { id } = req.params
        let products = await Product.findById(id);
        res.status(200).json(products)
    }catch(err) {
        res.status(500).json({ message: err.message});
    }
})



app.post('/addProduct', async( req,res) => {
     try{
        let product = await Product.create( req.body);
        res.status(200).json({
            data: product,
            message:'Successfully Saved Record'
        })
     }catch(err) {  
        res.status(500).json({ message: err.message});
     }
})

app.put('/updateProduct/:id', async( req,res) => {
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
})


app.delete('/deleteProduct/:id', async( req,res) => {
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
})




mongoose.set("strictQuery", false);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then( () => {
    console.log(`Connected to Mongo DB`)
}).catch(err=>{
    console.log(err)
})


app.listen( PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`)
}) 