const express = require("express");
const { allProduct } = require("../controllers/allProductController");

const router = express.Router();

router.get("/allProduct", allProduct);
module.exports = router;
