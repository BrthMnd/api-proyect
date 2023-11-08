// * Require
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const route = require("./src/routes/"); // <- Rutas
const { connect, disconnect, notFound } = require("./src/middlewares");
const { CORSConfiguration } = require("./src/config/cors.config");
const logger = require("morgan");

// * Configuration
app.use(bodyParser.json());
app.use(cors(CORSConfiguration));
app.use(logger("dev"));
app.use(cookieParser());

//middleware
app.use(connect);
app.use("/api", route);
app.use(disconnect);
app.use(notFound);

module.exports = app;
