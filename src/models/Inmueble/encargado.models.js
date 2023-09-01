const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EncargadoSchema = new Schema(
    {
        documento: {type: Number, required: true},
        nombres: { type: String, required: true},
        apellidos: { type: String, required: true},
        correo: {type: String, required: true},
        telefono: { type: String, required: true},
        estado: { type: Boolean, default: true},
        direccion: { type: String, required: true},
        fechCreacion: { type: Date, default: Date.now() },
    },
    {
        versionKey: false, // __v: 0
    }
);

const EncargadoModels = mongoose.model('Encargados', EncargadoSchema, 'encargados')

module.exports = {
    EncargadoModels,
}