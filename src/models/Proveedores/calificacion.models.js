// const { Schema, model } = require("mongoose");

// const calificacionSchema = new Schema(
//   {
//     Comentarios: { type: String, require: true },
//     CalificacionesFloat: { type: Number, require: true },
//   },
//   {
//     versionKey: false, // __v: 0
//   }
// );

// const CalificacionModel = model(
//   "Calificacion",
//   calificacionSchema,
//   "calificacion"
// );

// module.exports = { CalificacionModel };

const { Schema, model } = require("mongoose");

const calificacionSchema = new Schema(
  {
    Comentarios: { type: String, required: true },
    CalificacionesFloat: { 
      type: Number, 
      required: true,
      min: 0,  // Valor mínimo permitido
      max: 5   // Valor máximo permitido
    },
  },
  {
    versionKey: false,
  }
);

const CalificacionModel = model(
  "Calificacion",
  calificacionSchema,
  "calificacion"
);

module.exports = { CalificacionModel };
