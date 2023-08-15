const notFound = (req, res, next) => {
  res.status(404).send({
    message:
      "Error 404. ¿Qué hace un 404 en una fiesta? ¡Nada, porque no fue encontrado!",
    options: "Revisa la url y la conexion a la DB, y si no es eso nose :3",
  });
  next();
};

module.exports = { notFound };
