const expresss = require("express");
const router = expresss.Router();

const {updateUserDetails} = require("../controllers/updateUserDetailController");

router.put("/update-user-details/:id",updateUserDetails);

module.exports = router;