// * Require
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const route = require("./src/routes/index.routes"); // <- Rutas

// * Configuration
app.use(bodyParser.json());

// API
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// * Routes
app.use("/api", route);

module.exports = app;
