const express = require("express");
const jwt = require("jsonwebtoken");
const morgan = require('morgan')
const testRoutes = require("./routes/testRouter");
const mysql = require("./db/connection")

const app = express();
const PORT = 8080;


app.use(morgan("tiny"))
app.use(express.json());
app.use("/", testRoutes);

mysql.query("SELECT * FROM users")
.then(data=>{
    console.log("Success to connect to DB\n",data," \n ======================");
})
.catch(err =>{
    console.log("failed connect to DB");
});

app.get('/user', (req,res)=>{
    res.send("Hello Hilllllelllllll")
})


app.listen(PORT,()=>{
    console.log(`server start on port: ${PORT}`);
});
