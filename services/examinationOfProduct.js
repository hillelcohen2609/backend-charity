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
module.exports = {
  examination,
  ProductUpdate,
};
