const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PropietarioModels } = require("./propietario.models");
const { EncargadoModels } = require("./encargado.models");

const InmuebleSchema = new Schema(
  {
    tipoPropiedad: { type: String },
    direccion: { type: String },
    metrosCuadrados: { type: Number },
    nHabitaciones: { type: Number },
    nBanos: { type: Number },
    fechConstruccion: { type: Date },
    plano: {
      type: String,
      deafault:
        "https://misplanosdecasas.com/wp-content/uploads/2020/11/30-Planos-de-Casas-para-construir.pdf",
    },
    id_propietario: {
      type: Schema.Types.ObjectId,
      ref: PropietarioModels.modelName,
    },
    id_encargado: {
      type: Schema.Types.ObjectId,
      ref: EncargadoModels.modelName,
    },
    fechCreacion: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);
const InmuebleModels = mongoose.model("Inmuebles", InmuebleSchema, "inmuebles"); //

module.exports = {
  InmuebleModels,
};
