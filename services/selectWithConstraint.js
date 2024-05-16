const sql = require("../db/connection");

//return an array with a user inside
const selectUserByUsernameAndPassword = async (username, password) => {
  const [user] = await sql.query(
    "SELECT * FROM `charity`.`users` WHERE (`user_name`=? AND `password`=?)",
    [username, password]
  );

  return user;
};
const selectUserByUsername = async (username) => {
  const [user] = await sql.query(
    "SELECT * FROM `charity`.`users` WHERE (`user_name`=?)",
    [username]
  );
  return user;
};

const selectUserById = async (id) => {
  const [user] = await sql.query(
    "SELECT * FROM `charity`.`users` WHERE (`user_id`=?)",
    [username, password]
  );
  return user;
};

const selectUserByUserId = async (userId) => {
  const [user] = await sql.query(
    "SELECT * FROM `charity`.`borrowers` WHERE (`user_id`=?)",
    [userId]
  );
  return user;
};

module.exports = {
  selectUserByUsernameAndPassword,
  selectUserByUsername,
  selectUserById,
  selectUserByUserId,
};
