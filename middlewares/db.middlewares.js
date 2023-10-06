const { DatabaseConnector } = require("../db/dbConfig");
const Db = new DatabaseConnector();
const connect = (req, res, next) => {
	Db.connect(req, res, next);
};
const disconnect = (req, res, next) => {
	if (res.headersSent) {
		Db.close(req, res, next);
	} else {
		next();
	}
};

module.exports = {
	connect,
	disconnect,
};
