const mysql = require("../db/connection");
const {
  getCredsFromToken,
  getTokenFromCreds,
} = require("../middleware/authenticate");

const { insertNewUser } = require("../services/executeQueries");
const {
  selectUserByUsername,
  selectUserByUsernameAndPassword,
} = require("../services/selectWithConstraint");

//access cookie: req.cookies.cookie_name
//set cookie: res.cookie(cookie_name, 'cookie_value', /*optional*/{ maxAge: minute,HttpOnly: true });
//delete cookie: res.clearCookie('cookie_name');
/*====================================================  */
//check if the user is in DB;
//in DB=> send user details and set token
//not in db=> change status code and response"not in DB"
const login = async (req, res) => {
  const { username, password } = await req.body;
  if (username != undefined && password != undefined) {
    try {
      const user = await selectUserByUsernameAndPassword(username, password);
      if (user.length == 1) {
        const token = await getTokenFromCreds({ username, password });
        res.cookie("token", token);
        res.send(user[0]);
      } else {
        res
          .status(401)
          .send({ success: false, message: "No user with those creds exist" });
      }
    } catch (error) {
      res
        .status(404)
        .send({ success: false, message: "Error in select user from DB" });
    }
  } else {
    res
      .status(401)
      .send({ success: false, message: "Password or username empty!" });
  }
};

const signin = async (req, res) => {
  const { username, password, age, numberPhone } = await req.body;
  if (username != undefined && password.length > 5) {
    //need to verify that username or password aren't in DB
    if (age != undefined && numberPhone != undefined) {
      const isCredsInDb = await selectUserByUsername(username);
      if (isCredsInDb.length == 0) {
        //insert user value in db
        try {
          const result = await insertNewUser(
            username,
            password,
            age,
            numberPhone
          );
          if (result.affectedRows == 1) {
            const token = await getTokenFromCreds({
              username,
              password,
            });
            res.cookie("token", token);
            res.status(200).send({
              user_id: result.insertId,
              user_name: username,
              password,
              age,
              number_phone: numberPhone,
              access_rights: 1,
              trusted: 0,
              success: true,
            });
          } else {
            res
              .status(401)
              .send({ success: false, message: "error in inserting values" });
          }
        } catch (error) {
          console.error("error in inserting values", error);
          res
            .status(401)
            .send({ success: false, message: "error in inserting values" });
        }
      } else {
        res
          .status(401)
          .send({ success: false, message: "Try another username" });
      }
    } else {
      res
        .status(401)
        .send({ success: false, message: "All details must be plain!" });
    }
  } else {
    res.status(401).send({
      success: false,
      message: "Password must be at list 6 characters and username not null",
    });
  }
};

//logout func
//see if he has a cookie->yes->clearcookie.
//no->message ->"you aren't log in".
const logout = async (req, res) => {
  const cookie = req.cookies.token;
  if (cookie) {
    //he has a cookie
    res.clearCookie("token");
    res
      .status(200)
      .send({ success: true, message: "Succesfully deleted cookie" });
  } else {
    //he dosn't have a cookie
    res
      .status(401)
      .send({ success: false, message: "You aren't loged in yet!" });
  }
};
module.exports = {
  login,
  signin,
  logout,
};
