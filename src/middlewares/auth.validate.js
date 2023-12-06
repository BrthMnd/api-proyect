const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const AuthValidate = (req, res, next) => {
  const { token } = req.cookies(token);
  if (!token) {
    return res.status(400).send("Compa, no estas autorizado a oferta");
  }
  const verifyUser = jwt.verify(token, secret);
  if (!verifyUser) return res.status(400).send("Token invalido");
  req.user = verifyUser;
};
module.exports = { AuthValidate };
