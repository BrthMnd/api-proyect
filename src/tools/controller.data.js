const { Prueba2Models } = require("../models/prueba2.js");
const { DatabaseConnector } = require("../config/db");
const db = new DatabaseConnector();
const { deleteData } = require("./delete.data");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const models = Prueba2Models;

console.log(`
*** El Modelo actual es: "${models.modelName}" ***

¿Estas seguro que quieres eliminar?
\t si -> 1 \t no -> 2
`);
rl.question("ingrese la opcion: ", (option) => {
  console.log(`opcion ingresada -> ${option}!`);
  if (option == 1) {
    deleteData(models, db);
    console.log("Eliminando...");
  } else {
    console.log("Saliendo");
  }
  rl.close();
});
