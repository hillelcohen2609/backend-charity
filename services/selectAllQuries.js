const sql = require("../db/connection");

//return an array with all users
module.exports.selectAllUsers =async ()=>{
    const [users] =await sql.query("SELECT * FROM `charity`.`users`");
    return users;
}

//return an array with all products
module.exports.selectAllProducts = async()=>{
    const [products] =await sql.query("SELECT * FROM `charity`.`products`");
    return products;
}
