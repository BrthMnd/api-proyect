const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PropietarioModels } = require("./propietario.models");
const { FechaActual } = require("../../tools/date.tools");
const { EncargadoModels } = require("./encargado.models");

const InmuebleSchema = new Schema(
  {
    fechCreacion: { type: String, default: FechaActual, required: true },
    tipoPropiedad: { type: String, require: true },
    direccion: { type: String, require: true },
    metrosCuadrados: { type: Number, require: true },
    nHabitaciones: { type: Number, require: true },
    nBanos: { type: Number, require: true },
    estado: { type: Boolean, default: true },
    fechConstruccion: { type: String, default: "2005-11-22", require: true },
    id_propietario: {
      type: Schema.Types.ObjectId,
      ref: PropietarioModels.modelName,
      require: true,
    },
    id_encargado: {
      type: Schema.Types.ObjectId,
      ref: EncargadoModels.modelName,
      require: true,
    },

    ////////////////////////////////////////////////////
    documento: { type: Number, unique: true },
    nombre: { type: String },
    correo: { type: String, unique: true },
    telefono: { type: String},




  },
  {
    versionKey: false,
  }
);
const InmuebleModels = mongoose.model(
  "Inmuebles",
  InmuebleSchema,
  "property_Property"
);

module.exports = {
  InmuebleModels,
};
