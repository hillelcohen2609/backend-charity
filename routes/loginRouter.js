const expresss = require("express");
const {login,signin} = require("../controllers/loginController")
const router = expresss.Router();

router.post("/login",login);
router.post("/signin",signin);

module.exports = router; 