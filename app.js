// * Require
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const route = require("./src/routes/"); // <- Rutas
const { notFound } = require("./src/middlewares");
const { CORSConfiguration } = require("./src/config/cors.config");
const logger = require("morgan");
const db = require("./src/config/db");

// * Configuration
app.use(bodyParser.json());
app.use(cors(CORSConfiguration));
app.use(logger("dev"));
app.use(cookieParser());
db.on(
  "error",
  console.error.bind(console, "Error de conexión a la base de datos:")
);
db.once("open", () => {
  ("Conexión exitosa a la base de datos");
});

//middleware
app.use("/api", route);
app.use(notFound);

module.exports = app;
