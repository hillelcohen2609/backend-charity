const mysql = require("../db/connection");
const { getCredsFromToken } = require("../middleware/authenticate");
const { deleteProduct } = require("../services/deleteProduct");
const {
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");

const ProductDeleteController = async (req, res) => {
  const token = req.cookies.token;
  const creds = await getCredsFromToken(token);
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );
  const productId = req.params.id;
  const user = result[0].acces_rights;

  if (user === 3) {
    try {
      const resultProduct = await deleteProduct(productId);
      res.send({ product: resultProduct });
    } catch (err) {
      console.error(err);
      res.status(500).send({ success: false, message: "Server Error" });
    }
  } else {
    res.send({ massage: "You do not have permissions" });
  }
};

module.exports = {
  ProductDeleteController,
};
