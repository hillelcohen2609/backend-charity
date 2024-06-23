const mysql = require("../db/connection");
const { getCredsFromToken } = require("../middleware/authenticate");
const {
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");
const {
  examination,
  ProductUpdate,
  updatedBorrow,
} = require("../services/examinationOfProduct");

const ProductLoan = async (req, res) => {
  const token = req.cookies.token;
  const creds = await getCredsFromToken(token);
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );

  const id = req.params.id;
  const trusted = result[0].trusted;

  try {
    const product = await examination(id);
    const productAvailble = product[0].product_is_availble;

    if (trusted == 1 && productAvailble == 1) {
      res.status(200).send({ success: true, message: "Hi, you can borrow" });
      await ProductUpdate(id);
      await updatedBorrow(result[0].user_id, id);
    } else if (productAvailble == 0 && trusted == 1) {
      res
        .status(400)
        .send({ success: false, message: "The product is not available" });
    } else {
      res
        .status(403)
        .send({ success: false, message: "I'm sorry, but you can't borrow" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

module.exports = {
  ProductLoan,
};
