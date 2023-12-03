// const { CategoriaModel } = require("../models/Proveedores/categoria.models")
// const { ProveedoresModels } = require("../models/Proveedores/provedores.models")
// const { ServicioModels } = require("../models/Proveedores/servicios.models")

// class Dashboard {
//     async Grafics_Get (req,res,next){
//         try {
//             const categoria = await CategoriaModel.find()
//             const servicios = await ServicioModels.find()
//             const proveedor = await ProveedoresModels.find()
               


//             res.status(200).send('hola')
//         } catch (error) {
//             console.log(error)
//             return res.status(500).send('Error al obtener los datos')
//         }
//     }
// }
// module.exports = {Dashboard}


const { InmuebleModels } = require("../models/Inmueble/inmueble.models")
const { CategoriaModel } = require("../models/Proveedores/categoria.models")
const { ProveedoresModels } = require("../models/Proveedores/provedores.models")
const { ServicioModels } = require("../models/Proveedores/servicios.models")
const {OffersModel}=require("../models/Offers/offers.model")

class Dashboard {
    async Grafics_Get(req, res, next) {
        try {
            const categorias = await CategoriaModel.find()
            const servicios = await ServicioModels.find()
            const proveedores = await ProveedoresModels.find()
            const inmuebles = await InmuebleModels.find()
            const offers = await OffersModel.find()
            

            // Crear un objeto con los datos obtenidos
            const data = {
                categorias: categorias,
                servicios: servicios,
                proveedores: proveedores,
                inmuebles:inmuebles,
                offers: offers
            };

            // Enviar el objeto como respuesta en formato JSON
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al obtener los datos');
        }
    }
}

module.exports = { Dashboard }
