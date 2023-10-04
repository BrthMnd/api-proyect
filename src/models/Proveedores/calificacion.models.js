const { Schema, model } = require("mongoose");

const calificacionSchema = new Schema({
  Comentarios: { type: String, require: true },
  CalificacionesFloat: { type: Number, require: true },
},
{
  versionKey: false, // __v: 0
}
);

const CalificacionModel = model("Calificacion",calificacionSchema,"providers_Ratings");

module.exports = { CalificacionModel };
