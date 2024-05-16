const mysql = require("../db/connection");
const { getCredsFromToken } = require("../middleware/authenticate");
const { returnProduct } = require("../services/returnProduct");
const {
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");

const ProductReturnController = async (req, res) => {
  const token = req.cookies.token;
  const creds = await getCredsFromToken(token);
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );

  try {
    const resultReturnProduct = await returnProduct(result[0].user_id);

    res.send(resultReturnProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  ProductReturnController,
};
