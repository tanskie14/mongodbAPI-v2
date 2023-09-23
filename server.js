require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;
const productRoute = require('./routes/productRoute.js')
const { errorMiddlewareHandler } = require('./middleware/errorMiddleware.js')

app.use(cors())
app.use( express.json());
app.use( express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.status(200).json({ message: 'Welome to mongodb API'})
})

// ======================== Routes =================================== //
app.use('/api/products', productRoute );

//middleware

app.use( errorMiddlewareHandler );

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