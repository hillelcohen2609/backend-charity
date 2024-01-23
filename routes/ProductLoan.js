const express = require("express")
const { ProductLoan } = require("../controllers/ProductLoanController")

const router = express.Router();

router.post("/productLoan/:id", ProductLoan)
module.exports = router; 