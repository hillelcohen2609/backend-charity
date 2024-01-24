const express = require("express");
const { ProductUpload } = require("../controllers/ProductUploadController");

const router = express.Router();

router.post("/productUpload", ProductUpload);

module.exports = router;
