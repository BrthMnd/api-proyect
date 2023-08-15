// * Require
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const route = require("./src/routes/index.routes"); // <- Rutas
const { connect, disconnect, notFound } = require("./src/middlewares");

// * Configuration
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// Abrir
app.use(connect);

// * api
app.use("/api", route);

// Cerrar
app.use(disconnect);
// 404
app.use(notFound);
module.exports = app;
