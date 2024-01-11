const sql = require("../db/connection");

//i
module.exports.insertNewUser =async (username, password, age, numberPhone)=>{
    const insertUser =await sql.execute(
        "INSERT INTO `charity`.`users` (user_name,password,age,number_phone,access_rights,trusted) VALUES (?, ?, ?, ?, ?, ?)",
        [username, password, age, numberPhone, 1, 0]
      );
    const  [resultSetHeader] = insertUser;
    const { fieldCount, affectedRows, insertId } = resultSetHeader;
    return {affectedRows,insertId};  
}


