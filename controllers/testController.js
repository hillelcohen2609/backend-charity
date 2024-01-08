const mysql = require("../db/connection");
const {getCredsFromToken,getTokenFromCreds} = require("../middleware/authenticate")

//const cookieParser = require("cookie-parser");

module.exports.test = async () => {
  const [data] = await mysql.query("SELECT * FROM users");

  return data;
};

module.exports.about = async () => {
  const data = await mysql.query("SELEC * FROM users");
  console.log(data);
  return [data];
};

module.exports.testJwtCookie=async(req,res)=>{
  console.log(req.body);
  const token =await getTokenFromCreds(req.body);
  console.log("token in controller",token);
  res.cookie("token",token);
  return token;
}

module.exports.getCreds=async(req,res)=>{
  console.log("Cookies: ",req.cookies.token);
  const token =await req.cookies.token;
  const creds =await getCredsFromToken(token);
  return creds;

}