const { InmuebleModels } = require("../models/Inmueble/inmueble.models");
const { CategoriaModel } = require("../models/Proveedores/categoria.models");
const {
  ProveedoresModels,
} = require("../models/Proveedores/provedores.models");
const { ServicioModels } = require("../models/Proveedores/servicios.models");
const { OffersModel } = require("../models/Offers/offers.model");
const { OffersStatus_Model } = require("../models/Offers/OfferStatus");
const { UserModel } = require("../models/Users/users.models")

class Dashboard {
  async Grafics_Get(req, res, next) {
    
    try {
     
      const categorias = await CategoriaModel.find();
      
      const servicios = await ServicioModels.find().populate('Categoria_Servicio');
      
      const proveedores = await ProveedoresModels.find();
      
      const inmuebles = await InmuebleModels.find();
      
      const offers = await OffersModel.find();
     
      const offersStatus = await OffersStatus_Model.find();
      const usuarios = await UserModel.find();

      // Crear un objeto con los datos obtenidos
      const data = {
        categorias: categorias,
        servicios: servicios,
        proveedores: proveedores,
        inmuebles: inmuebles,
        offers: offers,
        offersStatus: offersStatus,
        usuarios:usuarios,
      };

      // Enviar el objeto como respuesta en formato JSON
      res.status(200).json(data);
    } catch (error) {
      error;
      return res.status(500).send("Error al obtener los datos");
    }
  }
}

module.exports = { Dashboard };



//class Dashboard {
  // async Grafics_Get(req, res, next) {
  //   ("Hello");
  //   try {
  //     ("entre");
  //     const categorias = await CategoriaModel.find();
  //     ("Categoria listo");
  //     const servicios = await ServicioModels.find();
  //     ("servicio listo");
  //     const proveedores = await ProveedoresModels.find();
  //     ("Proveedores listo");
  //     const inmuebles = await InmuebleModels.find();
  //     ("inmuebles listo");
  //     const offers = await OffersModel.find();
  //     ("inmuebles oferttaslisto");
  //     const offersStatus = await OffersStatus_Model.find();
  //     const usuarios = await UserModel.find();