const mysql = require("../db/connection");
//const { getCredsFromToken } = require("../middleware/authenticate");


module.exports.acces = async (req, res) => {
  //const token =  req.cookies.token

  if (true) {
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
    res.status(401).send("Unauthorized");
  }
};
