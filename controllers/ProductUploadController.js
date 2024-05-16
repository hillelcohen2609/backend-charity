const { getCredsFromToken } = require("../middleware/authenticate");
const {
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");
const { uploadingProducts } = require("../services/UploadingProducts");

const ProductUpload = async (req, res) => {
  const token = req.cookies.token;
  const creds = await getCredsFromToken(token);
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );
  const { product_name, category } = req.body;
  const trusted = result[0].trusted;
  if (trusted == 1 && product_name != undefined && category != undefined) {
    try {
      const ProductUpload = uploadingProducts(product_name, category);

      res.send("The product has been uploaded successfully");
      /*  res.send("Product uploaded successfully"); */
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading product");
    }
  } else {
    res.send("Sorry, you cannot upload the product");
  }
};

module.exports = {
  ProductUpload,
};
