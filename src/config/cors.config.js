function CORS(req, res, next) {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
}

module.exports = { CORS };
