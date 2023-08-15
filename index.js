require("dotenv").config();
const app = require("./app");
const { DatabaseConnector } = require("./src/config/db");
const db = new DatabaseConnector();
const PORT = process.env.PORT || 3002;

// * Listen -> Port
const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

process.on("exit", () => {
  db.close();
  console.log("hola");
});
