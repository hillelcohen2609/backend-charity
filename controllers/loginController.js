const mysql = require("../db/connection");
const {
  getCredsFromToken,
  getTokenFromCreds,
} = require("../middleware/authenticate");

//access cookie: req.cookies.cookie_name
//set cookie: res.cookie(cookie_name, 'cookie_value', /*optional*/{ maxAge: minute,HttpOnly: true });
//delete cookie: res.clearCookie('cookie_name');
/*====================================================  */
//check if the user is in DB;
//in DB=> send user details and set token
//not in db=> change status code and response"not in DB"
module.exports.login = async (req, res) => {
  const { username, password } = await req.body;
  if (username!=undefined && username!= undefined) {
    console.log("username: ", username, "password: ", password);
  console.log("type of: ", typeof password);
  try {
    const [[data]] = await mysql.query(
      "SELECT * FROM `charity`.`users` WHERE (`user_name`=? AND `password`=?)",
      [username, password]
    );
    console.log("User details:",data);
    const token = await getTokenFromCreds({username,password});
    res.cookie("token", token);
    res.send(data);
  } catch (error) {
    res.status(404).send("No user with those creds exist");
  }
    
  }else{
    res.status(401).send("Password or username empty!")
  }
};

module.exports.signin = async (req, res) => {
  const { username, password,age,numberPhone} = await req.body;
  console.log("try access: ", { username, password});
  if (username != undefined && password.length > 5) {
    //need to verify that username or password aren't in DB
    if(age!=undefined && numberPhone!=undefined ){
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
              const token =await getTokenFromCreds({username,password,age,numberPhone,accessRights:1,trusted:0})
              res.cookie("token",token);
              res.send({username,password,age,numberPhone,accessRights:1,trusted:0});
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

//logout func
//see if he has a cookie->yes->clearcookie.
//no->message ->"you aren't log in".
module.exports.logout=async(req,res)=>{
  const cookie = req.cookies.token;
  if (cookie){
    //he has a cookie
    res.clearCookie("token");
    res.send("Succesfully deleted cookie");
  }else{
    //he dosn't have a cookie
    res.status(401).send("You aren't loged in yet!");

  }
}
