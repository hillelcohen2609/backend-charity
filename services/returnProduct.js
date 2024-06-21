const sql = require("../db/connection");

// const userProductDelete = async (user_id) => {
//   const [deleteUserId] = await sql.execute(
//     "DELETE FROM `charity` . `borrowers` WHERE `user_id`=?",
//     [user_id]
//   );
//   console.log(deleteUserId);
// };

// const ProducReturn = async (user_id) => {
//   const [updateReturnProduct] = await sql.execute(
//     "UPDATE `charity`. `borrowers` SET is_returned =? WHERE `user_id`=?",
//     [0, user_id]
//   );
// };

const returnProduct = async (user_id, productId) => {
  try {
    const [resultReturnProduct] = await sql.execute(
      "SELECT * FROM `charity`.`borrowers` WHERE `user_id` =? AND id_product=?",
      [user_id, productId]
    );
    if (resultReturnProduct.length > 0) {
      await sql.execute(
        "UPDATE `charity`.`borrowers` SET `is_returned` = 1 WHERE `id_product`=? AND `user_id`=?",
        [productId, user_id]
      );

      await sql.execute(
        "UPDATE `charity`.`products` SET `product_is_availble` = 1 WHERE `id`=?",
        [productId]
      );

      return {
        success: true,
        message: "Product return was successful",
      };

      //affected row
    } else {
      return {
        success: false,
        message: "There are no products to return",
      };
    }
  } catch (error) {
    console.error("Error in updating borrowers:", error);
    throw error;
  }
};
module.exports = {
  returnProduct,
  //   userProductDelete,
  //   ProducReturn,
};

// //  "SELECT * FROM `charity`. `users` WHERE `acces_rights` IN (?, ?)",
// [2, 1];
