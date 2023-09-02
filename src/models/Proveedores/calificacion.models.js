const { Schema, model } = require("mongoose");

const calificacionSchema = new Schema({
  Comentarios: String,
  CalificacionesFloat: { type: Number },
});

const CalificacionModel = model(
  "Calificacion",
  calificacionSchema,
  "calificacion"
);

module.exports = { CalificacionModel };
