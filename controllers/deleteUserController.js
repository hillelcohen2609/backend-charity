const { getCredsFromToken } = require("../middleware/authenticate");
const {
  selectUserByUsernameAndPassword,
  selectUserByUserId,
} = require("../services/selectWithConstraint");
const { userDelete } = require("../services/deleteUser");

const deleteUser = async (req, res) => {
  const token = req.cookies.token;
  const creds = await getCredsFromToken(token);
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );
  /* const userIdLogin = result[0].user_id; */

  const accesRight = result[0].acces_rights;
  const userId = req.params.userId;
  const examinationUserId = await selectUserByUserId(userId);
  const ProductReturn = examinationUserId[0];

  if (
    (accesRight == 3 && ProductReturn == undefined) ||
    (accesRight == 3 && ProductReturn.is_returned == 1)
  ) {
    try {
      await userDelete(userId);
      res.send({ success: false, message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ success: false, message: "Error user deleted" });
    }
  } else {
    res.send({ message: "You cannot delete this user" });
  }
};

module.exports = {
  deleteUser,
};
