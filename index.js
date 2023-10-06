// DEPENDENCIES
const app = require("./app.js");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;

// Start the server
const server = app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
	console.log("Proceso terminado");
	server.close(() => {
		console.log("Servidor cerrado.");
		process.exit(0);
	});
});
