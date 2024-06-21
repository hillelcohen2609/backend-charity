const express = require("express");
const {
  ProductReturnController,
} = require("../controllers/ProductReturnController");

const router = express.Router();
router.post("/productReturn/:id", ProductReturnController);

module.exports = router;
