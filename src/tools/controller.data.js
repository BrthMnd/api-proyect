const { Prueba2Models } = require("../models/prueba2.js");
const { DatabaseConnector } = require("../config/db");

const { deleteData } = require("./delete.data");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// cambia el modelo segun lo quieras eliminar 🔽 OJO modelo sin parentesis
// para que pueda funcionar tanto en el require como en model que se envia
// en la funcion deletedata()
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
