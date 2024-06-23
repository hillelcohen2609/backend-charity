const {
  selectUserByUsernameAndPassword,
  selectUserByUsername,
  selectUserById,
} = require("../services/selectWithConstraint");
const { updateUserInfo } = require("../services/executeQueries");
const { getCredsFromToken } = require("../middleware/authenticate");

const updateUser = async (req, res, id, accessRights, oldUsername) => {
  const body = await req.body;
  const { username, password, age, numberPhone, access, trusted } = body;
  if (oldUsername == username) {
    //not update the username
    const ress = await updateUserInfo(
      id,
      accessRights,
      username,
      password,
      age,
      numberPhone,
      access,
      trusted
    );
    if (ress == 1) {
      res.status(200).send({ success: true, message: "User Update" });
    } else {
      res.status(400).send({ success: false, message: "Error Unsucceed!" });
    }
  } else {
    //update the username
    const ress = await selectUserByUsername(username);
    if (ress.length == 0) {
      //nobody with this username
      const resss = await updateUserInfo(
        id,
        accessRights,
        username,
        password,
        age,
        numberPhone,
        access,
        trusted
      );
      if (resss == 1) {
        res.send({ success: true, message: "User Update" });
      } else {
        res.status(400).send({ success: false, message: "Error Unsucceed!" });
      }
    } else {
      res.status(400).send({ success: false, message: "Try another username" });
    }
  }
};

const updateUserDetails = async (req, res) => {
  const token = (await req.cookies) && req.cookies.token;
  if (token != undefined) {
    //there is token(did login)
    const userJson = await getCredsFromToken(token);
    const { username, password } = userJson;
    //need to check what level of access right he got
    try {
      const user = await selectUserByUsernameAndPassword(username, password);
      if (user.length == 1) {
        //there is such user in DB
        const accessRights = user[0].access_rights;
        const id = req.params.id;
        const [oldUser] = await selectUserById(id);
        if (id == user[0].user_id) {
          //he want to update his self details
          await updateUser(req, res, id, accessRights, oldUser.user_name);
        } else {
          //he want to update detail of other
          if (accessRights > 1) {
            if (accessRights == 2) {
              //manager could update just users (Not Admin)
              //We will check that he don't try to update a manager or un Admin;
              if (oldUser.access_rights == 1) {
                await updateUser(req, res, id, accessRights, oldUser.user_name);
              } else {
                //he isn't allowed to do so
                res.status(401).send({
                  success: false,
                  message: "You arn't allowed to this resource",
                });
              }
            } else {
              //Admin he can do everything
              await updateUser(req, res, id, accessRights, oldUser.user_name);
            }
          } else {
            //he is not allowed (regular user)
            res.status(401).send({
              success: false,
              message: "You arn't allowed to this resource",
            });
          }
        }
      } else {
        //this user isn't recognize in DB he invented a token
        res
          .status(404)
          .send({ success: false, message: "The token is expired log again" });
      }
    } catch (error) {
      console.error("error", error);
      res
        .status(401)
        .send({ success: false, message: "Didn't update successfully" });
    }
  } else {
    //he dont have token
    res.status(404).send({ success: false, message: "Login first/again" });
  }
};
module.exports = {
  updateUserDetails,
  updateUser,
};
