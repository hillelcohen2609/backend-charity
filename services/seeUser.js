const sql = require("../db/connection");

const seeAllUser = async () => {
  const [allUser] = await sql.query("SELECT * FROM `charity`. `users`");
  return allUser;
};
const seeJustUser = async () => {
  const [justUser] = await sql.query(
    "SELECT * FROM `charity`. `users` WHERE `acces_rights` IN (?, ?)",
    [2, 1]
  );
  return justUser;
};
module.exports = {
  seeAllUser,
  seeJustUser,
};
