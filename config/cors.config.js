function CORS(req, res, next) {
	res.append("Access-Control-Allow-Origin", ["*"]);
	res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.append(
		"Access-Control-Allow-Headers",
		"Origin, Content-Type, X-Auth-Token, Authorization"
	);

	next();
}

module.exports = { CORS };

//esto ya se hace con el paquete cors
