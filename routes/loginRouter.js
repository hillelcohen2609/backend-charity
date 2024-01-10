const expresss = require("express");
const {login,signin,logout} = require("../controllers/loginController")
const router = expresss.Router();

router.post("/login",login);
router.post("/signin",signin);
router.get("/logout",logout);

module.exports = router; 