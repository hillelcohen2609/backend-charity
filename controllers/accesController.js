const mysql = require("../db/connection");
const { getCredsFromToken } = require("../middleware/authenticate");
const {
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");

module.exports.acces = async (req, res) => {
  const token = req.cookies.token;
  //console.log(token);

  //Get the access permissions
  const creds = await getCredsFromToken(token);
  //console.log(a);

  //Identify the user by username and password
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );
  console.log(result);

  if (token) {
    //console.log(token)
    if (result[0].acces_rights == 1) {
      console.log(result[0].acces_rights);
      try {
        const [product] = await mysql.query(
          "SELECT * FROM `charity`. `products` WHERE (`product_is_availble`=?)",
          [1]
        );
        console.log(product);
        if (product.length > 0) {
          res.send(product);
        } else {
          res.status(401).send("No products available");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    } else {
      try {
        const [product] = await mysql.query(
          "SELECT * FROM `charity`. `products`"
        );
        console.log(product);
        if (product.length > 0) {
          res.send(product);
        } else {
          res.status(401).send("No products available");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};
