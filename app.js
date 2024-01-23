const express = require("express");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const morgan = require('morgan');
require('express-async-errors');

const testRoutes = require("./routes/testRouter");
const loginRouter = require("./routes/loginRouter");
const updateRouter = require("./routes/updateUserDetailRouter")
const accesRouter = require("./routes/accesRouter")
const productLoan = require("./routes/ProductLoan")
//const mysql = require("./db/connection")

const app = express();
const PORT = 8080;

//middle ware
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(express.json());


//All routes start here
app.use("/", testRoutes);
app.use("/", loginRouter);
app.use("/",updateRouter)
app.use("/", accesRouter)
app.use("/", productLoan)


//Global error handler
app.use((err,req,res,next)=>{
    console.log("===============================\n",err,"\n==================================");
    res.status(err.status||500).send("Somthing went wrong")
})


app.listen(PORT,()=>{
    console.log(`server start on port: ${PORT}`);
});
