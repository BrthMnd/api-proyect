function CORS(req, res, next) {
  res.append("Access-Control-Allow-Origin", "http://localhost:5173");
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Credentials", "true");
  res.append(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token, Authorization"
  );

  next();
}

module.exports = { CORS };
