const sql = require("../db/connection");

const userDelete = async (userId) => {
  const [deleteUserId] = await sql.execute(
    "DELETE FROM `charity` . `users` WHERE (`user_id`=?)",
    [userId]
  );
  return deleteUserId;
};

module.exports = {
  userDelete,
};
