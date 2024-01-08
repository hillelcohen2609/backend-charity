const mysql = require("mysql2/promise");
require("dotenv").config();

// create the connection to database
const connection = mysql.createPool({
  host: process.env.HOST_DB  ,
  user: process.env.USER_NAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.SCHEMA,
});



module.exports = connection;