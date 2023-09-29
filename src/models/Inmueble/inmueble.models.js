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
    estado: { type: Boolean, default: true },
    fechConstruccion: { type: Date },
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
