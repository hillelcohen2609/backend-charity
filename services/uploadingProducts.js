const sql = require("../db/connection");

const uploadingProducts = async (product_name, category) => {
  try {
    const [resultSetHeader] = await sql.execute(
      "INSERT INTO `charity`. `products` (product_name, category, product_is_availble) VALUES (?,?,?)",
      [product_name, category, 1]
    );
    const { fieldCount, affectedRows, insertId } = resultSetHeader;
    console.log(resultSetHeader);
    return { affectedRows, resultSetHeader };

  } catch (error) {
    console.error("Error in uploadingProducts:", error);
    throw error;
  }
};

module.exports = {
  uploadingProducts,
};
