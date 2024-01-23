const mysql = require("../db/connection");
const { getCredsFromToken } = require("../middleware/authenticate");
const {
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");
const {
  examination,
  ProductUpdate,
} = require("../services/examinationOfProduct");

const ProductLoan = async (req, res) => {
  const token = req.cookies.token;
  const creds = await getCredsFromToken(token);
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );

  try {
    const id = req.params.id;
    console.log("id:", id);
    const product = await examination(id);
    const updateResult = await ProductUpdate(id);

    const trusted = result[0].trusted;
    const productAvailble = product[0].product_is_availble;
    /* const messages = ["Message 1", "Message 2", "Message 3"];
    res.json({ messages }); */
    if (trusted == 1 && productAvailble == 1) {
      res.send("Hi, you can borrow");
      console.log("The product you selected is:", product[0].product_name);
    } else if (productAvailble == 0 && trusted == 1) {
      res.send("The product is not available");
    } else {
      res.send("I'm sorry, but you can't borrow");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
  console.log("number of trusted", result[0].trusted);
};

module.exports = {
  ProductLoan,
};
