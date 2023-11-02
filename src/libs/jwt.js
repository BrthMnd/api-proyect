const jwt = require("jsonwebtoken");
const Secret = process.env.SECRET_KEY || "hohohoho";

async function CreateAccess(payload) {
    try {
        const token = await jwt.sign(
            payload,
            Secret,
            {
              expiresIn: "1d",
            }
          )
          return token
    } catch (error) {
        return error
    }
  
}
module.exports = {CreateAccess}