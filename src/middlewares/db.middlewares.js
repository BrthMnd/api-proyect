const { DatabaseConnector } = require("../config/db");
const Db = new DatabaseConnector();
const connect = (req, res, next) => {
  Db.connect(req, res, next);
};
const disconnect = (req, res, next) => {
  Db.close(req, res, next);
};

module.exports = {
  connect,
  disconnect,
};
