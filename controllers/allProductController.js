const mysql = require("../db/connection");
const { getCredsFromToken } = require("../middleware/authenticate");
const {
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");

const allProduct = async (req, res) => {
  const token = req.cookies.token;

  //Get the access permissions
  const creds = await getCredsFromToken(token);

  //Identify the user by username and password
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );

  if (token) {
    if (result[0].acces_rights == 1) {
      try {
        const [product] = await mysql.query(
          "SELECT * FROM `charity`. `products` WHERE (`product_is_availble`=?)",
          [1]
        );

        if (product.length > 0) {
          res.send({ product: product });
        } else {
          res
            .status(401)
            .send({ success: false, message: "No products available" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Server Error" });
      }
    } else {
      try {
        const [product] = await mysql.query(
          "SELECT * FROM `charity`. `products`"
        );

        if (product.length > 0) {
          res.send({ product: product });
        } else {
          res
            .status(401)
            .send({ success: false, message: "No products available" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Server Error" });
      }
    }
  } else {
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};
module.exports = {
  allProduct,
};
