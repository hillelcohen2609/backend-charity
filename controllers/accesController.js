const mysql = require("../db/connection");
const { getCredsFromToken, getTokenFromCreds } = require("../middleware/authenticate");



module.exports.acces = async (req, res) => {
  const token = await req.cookies.token
  //console.log(token);
  const a = await getCredsFromToken(token)
  console.log(a);


  if (token) {
    console.log(token)
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
