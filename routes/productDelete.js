const express = require("express");
const {
  ProductDeleteController,
} = require("../controllers/ProductDeleteController");

const router = express.Router();
router.delete("/productDelete/:id", ProductDeleteController);

module.exports = router;
