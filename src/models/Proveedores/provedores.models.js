const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {CalificacionModel} = require("./calificacion.models")
const proveedoresSchema = new Schema({
  Nombre: { type: String, require: true },
  Apellido: { type: String, require: true },
  Documento: { type: String, unique: true, require: true },
  Telefono: { type: String, require: true },
  Email: { type: String, unique: true },
  Direccion: { type: String, require: true },
  id_calificacion: {
    type: Schema.Types.ObjectId,
    ref: CalificacionModel.modelName,
    require: true,}
},
{
  versionKey: false, // __v: 0
}
);
const ProveedoresModels = mongoose.model("Proveedores", proveedoresSchema,"providers_Providers");

module.exports = { ProveedoresModels };
