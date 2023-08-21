const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PropietarioModels } = require("../Propietario/propietario.models");
const { EncargadoModels } = require("../Encargado/encargado.models");

const InmuebleSchema = new Schema(
  {
    tipoPropiedad: { type: String, required: true },
    direccion: { type: String, required: true },
    metrosCuadrados: { type: Number, required: true },
    nHabitaciones: { type: Number, required: true },
    nBanos: { type: Number, required: true },
    fechConstruccion: { type: Date, required: false },
    plano: {
      type: String,
      deafault:
        "https://misplanosdecasas.com/wp-content/uploads/2020/11/30-Planos-de-Casas-para-construir.pdf",
    },
    id_propietario: { type: Schema.Types.ObjectId, ref: PropietarioModels },
    id_encargado: { type: Schema.Types.ObjectId, ref: EncargadoModels },
    fechCreacion: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);
const InmuebleModels = mongoose.model("Inmuebles", InmuebleSchema, "inmubles");

module.exports = {
  InmuebleModels,
};
