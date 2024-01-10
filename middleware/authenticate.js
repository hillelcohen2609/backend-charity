const jwt = require("jsonwebtoken");
require("dotenv").config();

//get user json-> {username:"vjhv",password:" "} return -> token "wsdfghjkl;lkjhgfdsdfghjkllkjhgffghjklkjhgfghj"
module.exports.getTokenFromCreds = async (userJsonCreds) => {
    try {
        const token = await jwt.sign(userJsonCreds, process.env.SECRET_KEY, { expiresIn: "0.25h" });
        console.log("token: ", token);
        return token;
    } catch (error) {
        console.error(error);
        return "Error-occurred";
    }
};

//get token -> user json-> {username:"vjhv",password:" "}
module.exports.getCredsFromToken =async (token) => {
    try {
        const creds = await jwt.verify(token, process.env.SECRET_KEY);
        return creds
    } catch (err) {
        console.error(err);
        return "Error-occurred";
    }
};
