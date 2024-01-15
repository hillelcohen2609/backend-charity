const sql = require("../db/connection");

//return an array with a user inside
module.exports.selectUserByUsernameAndPassword = async (username,password) => {
  const [user] = await sql.query(
    "SELECT * FROM `charity`.`users` WHERE (`user_name`=? AND `password`=?)",
    [username, password]
  );
  return user;
};

module.exports.selectUserByUsername = async (username) => {
    const [user] = await sql.query(
      "SELECT * FROM `charity`.`users` WHERE (`user_name`=?)",
      [username]
    );
    return user;
  };

  module.exports.selectUserById = async (id) => {
    const [user] = await sql.query(
      "SELECT * FROM `charity`.`users` WHERE (`user_id`=?)",
      [id]
    );
    return user;
  };