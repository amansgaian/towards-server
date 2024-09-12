const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const PORT  = process.env.PORT || 3000;
const connectDB = require('./config/connection');
connectDB();

//IMPORT ROUTE
const userRouter = require("./routes/userRoute");
const { verifyToken } = require('./utils/helper');


//BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//TESTING END POINT
app.get('/test-route', verifyToken, (req, res) => {
    const user = req.user;
    res.status(200).json({
        status: "success",
        message: `Hello, ${user.email}. You have access to this route.`,
        user
    });
});


//ALL ROUTES
app.use("/api/v1.0" ,userRouter);



//LISTENING PORT
app.listen(PORT , ()=>{
    console.log(`server is running on PORT : ${PORT}`)
})