const express = require("express");
const {
  ProductReturnController,
} = require("../controllers/ProductReturnController");

const router = express.Router();
router.get("/productReturn", ProductReturnController);

module.exports = router;
