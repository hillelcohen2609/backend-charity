const { getCredsFromToken } = require("../middleware/authenticate");
const {
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");
const { seeAllUser, seeJustUser } = require("../services/seeUser");

const seeUser = async (req, res) => {
  const token = req.cookies.token;
  const creds = await getCredsFromToken(token);
  const result = await selectUserByUsernameAndPassword(
    creds.username,
    creds.password
  );
  const accesRight = result[0].acces_rights;
  console.log(accesRight);
  if (accesRight == 3) {
    const seeUser = await seeAllUser();
    res.send(seeUser);
  } else if (accesRight == 2) {
    const seeJustUserOnly = await seeJustUser();
    res.send(seeJustUserOnly);
  } else {
    res.send({
      success: false,
      message: "Sorry, you cannot see the user details",
    });
  }
};

module.exports = {
  seeUser,
};
