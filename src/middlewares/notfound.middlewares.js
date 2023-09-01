const { DatabaseConnector } = require("../config/db");
const db = new DatabaseConnector();

const notFound = (req, res, next) => {
  res.status(404).send({
    message:
      "Error 404. ¿Por que 404 es el mejor asesino? ¡Porque nunca fue encontrado!",
    options: "Revisa la url y la conexion a la DB, y si no es eso nose :3",
  });
  db.close();
};

module.exports = { notFound };
