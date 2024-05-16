const sql = require("../db/connection");

const userProductDelete = async (user_id) => {
  const [deleteUserId] = await sql.execute(
    "DELETE FROM `charity` . `borrowers` WHERE `user_id`=?",
    [user_id]
  );
  console.log(deleteUserId);
};

const ProducReturn = async (user_id) => {
  const [updateReturnProduct] = await sql.execute(
    "UPDATE `charity`. `borrowers` SET is_returned =? WHERE `user_id`=?",
    [0, user_id]
  );
};

const returnProduct = async (user_id) => {
  try {
    const [resultReturnProduct] = await sql.execute(
      "SELECT * FROM `charity`.`borrowers` WHERE `user_id` IN (?)",
      [user_id]
    );
    resultReturnProduct.forEach((result) => {
      console.log("hiiiiiii:", result.is_returned);

      if (result.is_returned == 0) {
        userProductDelete(result.user_id);
        console.log("deleted");
      } else if (result.is_returned == 1) {
        ProducReturn(result.user_id);
        console.log("The product return was successful");
      } else {
        console.log("ERROR");
      }
    });

    return resultReturnProduct;
  } catch (error) {
    console.error("Error in updating borrowers:", error);
    throw error;
  }
};
module.exports = {
  returnProduct,
  userProductDelete,
  ProducReturn,
};

//  "SELECT * FROM `charity`. `users` WHERE `acces_rights` IN (?, ?)",
[2, 1];
