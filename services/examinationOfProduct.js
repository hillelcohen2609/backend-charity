const sql = require("../db/connection");

const examination = async (id) => {
  const [examinationProduct] = await sql.query(
    "SELECT * FROM `charity`. `products` WHERE (`id`=?)",
    [id]
  );
  return examinationProduct;
};

const ProductUpdate = async (id) => {
  const [updateProduct] = await sql.execute(
    "UPDATE `charity`. `products` SET product_is_availble =? WHERE `id`=?",
    [0, id]
  );
  if (updateProduct.affectedRows === 1) {
    console.log(`Product with ID ${id} updated successfully.`);
  }
  return updateProduct;
};

const updatedBorrow = async (user_id, productId) => {
  try {
    const [borrowerUpdate] = await sql.execute(
      "INSERT INTO `charity`.`borrowers` (user_id, is_returned, id_product) VALUES (?, ?,?)",
      [user_id, 0, productId]
    );

    console.log("Borrower updated sucuplocessfully");
    return borrowerUpdate;
  } catch (error) {
    console.error("Error in updating borrowers:", error);
    throw error;
  }
};

module.exports = {
  examination,
  ProductUpdate,
  updatedBorrow,
};
