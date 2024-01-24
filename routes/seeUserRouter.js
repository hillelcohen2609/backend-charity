const express = require("express")
const router = express.Router()
const { seeUser } = require("../controllers/seeUserController")


router.get("/seeUser", seeUser)

module.exports = router