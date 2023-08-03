require("dotenv").config();

const { DatabaseConnector } = require("../database/db");
const { middlewaresUpData, middlewaresDeleteData } = require("./middlewares");
const { pruebaDatos } = require("./modelsBlock.Offers");

const db = new DatabaseConnector();

const executeFaker = async () => {
  let Arreglo = [];
  for (let i = 0; i < 1; i++) {
    let { data } = pruebaDatos();
    await Arreglo.push(data);
  }
  let { collection } = pruebaDatos();
  middlewaresUpData(Arreglo, collection, db);
};

executeFaker();
// middlewaresDeleteData("status", db);
