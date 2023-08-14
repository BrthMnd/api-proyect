// * Require
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const route = require("./src/routes/index.routes"); // <- Rutas
const { DatabaseConnector } = require("./src/config/db");
const Db = new DatabaseConnector();

// * Configuration
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// Abrir
app.use((req, res, next) => Db.connect(req, res, next));

// * api
app.use("/api", route);

// Cerrar
app.use((req, res, next) => Db.close(req, res, next));

module.exports = app;
