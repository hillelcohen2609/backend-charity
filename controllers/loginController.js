const mysql = require("../db/connection");
const {
  getCredsFromToken,
  getTokenFromCreds,
} = require("../middleware/authenticate");

//check if the user is in DB;
//in DB=> send user details and set token
//not in db=> change status code and response"not in DB"
module.exports.login = async (req, res) => {
  const { username, password } = await req.body;
  console.log("username: ", username, "password: ", password);
  console.log("type of: ", typeof password);
  try {
    const [data] = await mysql.query(
      "SELECT * FROM `charity`.`users` WHERE (`user_name`=? AND `password`=?)",
      [username, password]
    );
    const token = await getTokenFromCreds({ username, password });
    res.cookie("token", token);
    res.send(data);
  } catch (error) {
    res.status(404).send("No user with those creds exist");
  }
};

module.exports.signin = async (req, res) => {
  const { username, password,age,numberPhone} = await req.body;
  console.log("try access: ", { username, password,age,numberPhone});
  if (username != null && password.length > 5) {
    //need to verify that username or password aren't in DB
    if(age && numberPhone ){
        const [isCredsInDb] = await mysql.query(
            "SELECT * FROM `charity`.`users` WHERE (`user_name`=? OR `password`=?)",
            [username, password]
          );
          if (isCredsInDb.length == 0) {
            //insert user value in db
            try {
              
              const result = await mysql.execute(
                "INSERT INTO `charity`.`users` (user_name,password,age,number_phone,access_rights,trusted) VALUES (?, ?, ?, ?, ?, ?)",
                [username, password,age,numberPhone,1,0]
              );
              console.log("result: ",result);
              const token =await getTokenFromCreds({username,password})
              res.cookie("token",token);
              res.send("Successfully added to DB");
            } catch (error) {
                console.log("error in inserting values");
                res.status(401).send("error in inserting values");
            }
          }
    }else{
        res
      .status(401)
      .send("All details must be plain!");
    }
    
  } else {
    res
      .status(401)
      .send("Password must be at list 6 characters or change username");
  }
};
