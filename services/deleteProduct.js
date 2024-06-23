const sql = require("../db/connection");

async function deleteProduct(id) {
  try {
    const [result] = await sql.execute(
      `SELECT * FROM charity.products
            where id =?
            and product_is_availble = 1`,
      [id]
    );

    if (result.length == 1) {
      const [result] = await sql.execute(
        `DELETE FROM products
      WHERE id = ?`,
        [id]
      );
      if (result.affectedRows > 0) {
        return { success: true, message: "Product deleted." };
      } else {
        return {
          success: false,
          message:
            "Product not deleted (either it does not exist or it is currently borrowed).",
        };
      }
    } else {
      return {
        success: false,
        message: "Product is not availble because it is borrow",
      };
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

module.exports = {
  deleteProduct,
};
