const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const proveedorSchema = new Schema({
  ID_Proveedor: { type: String, required: true },
  ID_Servicio: { type: Schema.Types.ObjectId, ref: 'ID_Servicio'}
});

const ProveedorModels = model('Proveedor', proveedorSchema, 'proveedor');

module.exports = {ProveedorModels};
