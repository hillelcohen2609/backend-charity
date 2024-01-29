const express = require("express")
const {deleteUser} = require("../controllers/deleteUserController")

const router = express.Router()



router.delete("/deleteUser/:userId", deleteUser)
module.exports = router