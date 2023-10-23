// * Require
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const route = require("./src/routes/"); // <- Rutas
const { connect, disconnect, notFound } = require("./src/middlewares");
const { CORS } = require("./src/config/cors.config");
const logger = require("morgan");
// * Configuration
app.use(bodyParser.json());
app.use(CORS);
app.use(logger("dev"));
//middleware
app.use(connect);
app.use("/api", route);
app.use(disconnect);
app.use(notFound);

module.exports = app;
