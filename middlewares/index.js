const { connect, disconnect } = require("./db.middlewares");
const { notFound } = require("./notfound.middlewares");

module.exports = {
	connect,
	disconnect,
	notFound,
};
