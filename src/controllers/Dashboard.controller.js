const { CategoriaModel } = require("../models/Proveedores/categoria.models")
const { ProveedoresModels } = require("../models/Proveedores/provedores.models")
const { ServicioModels } = require("../models/Proveedores/servicios.models")

class Dashboard {
    async Grafics_Get (req,res,next){
        try {
            const categoria = await CategoriaModel.find()
            const servicios = await ServicioModels.find()
            const proveedor = await ProveedoresModels.find()
               


            res.status(200).send('hola')
        } catch (error) {
            console.log(error)
            return res.status(500).send('Error al obtener los datos')
        }
    }
}
module.exports = {Dashboard}