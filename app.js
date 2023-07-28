// * Require
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const route = require("./src/router/index"); // <- Rutas

const port = 3030;

// const path = require("path");

// * Configuration
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// * Routes
app.use("/api", route);

module.exports = app

