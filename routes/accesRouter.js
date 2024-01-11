const express = require("express")
const { acces } = require("../controllers/accesController")

const router = express.Router();

router.get("/acces", acces)
module.exports = router; 