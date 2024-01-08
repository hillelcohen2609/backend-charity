const jwt = require("jsonwebtoken");
require("dotenv").config();

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

module.exports.getCredsFromToken =async (token) => {
    try {
        const creds = await jwt.verify(token, process.env.SECRET_KEY);
        return creds
    } catch (err) {
        console.error(err);
        return "Error-occurred";
    }
};
