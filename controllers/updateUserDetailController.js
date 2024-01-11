const mysql = require("../db/connection");
const {
  getCredsFromToken,
  getTokenFromCreds,
} = require("../middleware/authenticate");

const verifyNewUserNameAndPasswordAreUniqe = (username,password)=>{
    mysql.query("SELECT * FROM `charity`.`users` WHERE (`user_name`=? OR `password`=?)",
    [username, password]).then(([res])=>{
        if (res.length==1) {
            //its ok its the same user 
            
        }else{
            //
        }
    })
}

module.exports.updateUserDetails = async (req,res)=>{
    const token = await req.cookies.token;
    if (token!=undefined) {
        //there is token(did login)
        const userJson = await getCredsFromToken(token);
        console.log("user json ",userJson);
        const {username , password } =userJson;
        //need to check what level of access right he got
        try {
            const [[data]] = await mysql.query(
                "SELECT * FROM `charity`.`users` WHERE (`user_name`=? AND `password`=?)",
                [username, password]
              );
              console.log("User details:", data);
              if (data != undefined) {
                //there is such user in DB
                const accessRights = data.access_rights;
                switch (accessRights) {
                    case 1:
                        /*He is a regular user he is allowed just to apdate in his stuff username,
                          password, number phone ,age !note! username and password are uniqe in DB  */
                          const id = req.params.id;
                          if(id == data.user_id){
                            //he can update several thing
                            const updateUserParams = req.body;
                          }else{
                            //he is forbidden to do so
                          }
                        
                        break;
                    case 2:
                        /*He is a manager he can update his thing and user thing but not him to be admin 
                          or user to be manager level (he can update user to be trusted) */
                    case 3:
                        /*He is an Admin he could apdate everyThing that he want   */          
                
                    default:
                        //threre is a bug in DB
                        break;
                }
              }else{
                //this user isn't recognize in DB
              }
        } catch (error) {
            
        }
        
    }else{
        //he dont have token
    }
}