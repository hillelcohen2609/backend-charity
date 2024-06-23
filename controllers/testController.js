const mysql = require("../db/connection");
const {
  getCredsFromToken,
  getTokenFromCreds,
} = require("../middleware/authenticate");

//const cookieParser = require("cookie-parser");
//מקצועןןןןןן
module.exports.test = async () => {
  const [data] = await mysql.query("SELECT * FROM users");

  return data;
};

module.exports.about = async () => {
  const data = await mysql.query("SELECT * FROM users");
  return [data];
};

module.exports.testJwtCookie = async (req, res) => {
  const token = await getTokenFromCreds(req.body);
  res.cookie("token", token);
  return token;
};

module.exports.getCreds = async (req, res) => {
  const token = await req.cookies.token;
  const creds = await getCredsFromToken(token);
  return creds;
};
