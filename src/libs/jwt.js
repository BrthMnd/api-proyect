const jwt = require("jsonwebtoken");
const Secret = process.env.SECRET_KEY || "hohohoho";

async function CreateAccess(payload) {
  try {
    const token = await jwt.sign(payload, Secret, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    return error;
  }
}
async function CreateConfirmToken(payload) {
  try {
    const token = await jwt.sign(payload, Secret, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    return error;
  }
}
async function GetConfirmToken(token) {
  try {
    const isConfirm = jwt.verify(token, Secret);
    return isConfirm;
  } catch (error) {
    error;
    return error;
  }
}
module.exports = { CreateAccess, CreateConfirmToken, GetConfirmToken };
