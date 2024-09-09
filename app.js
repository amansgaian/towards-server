const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
console.log(process.env.PORT)
const PORT  = process.env.PORT || 3000;
const connectDB = require('./config/connection');
connectDB();

app.get("/test" , (req, res)=>{
    res.status(200).json({
        status : "success"
    });
});



app.listen(PORT , ()=>{
    console.log(`server is running on PORT : ${PORT}`)
})