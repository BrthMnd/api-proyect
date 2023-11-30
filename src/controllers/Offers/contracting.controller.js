const { ObjectId } = require("mongodb");
const { ContractingModal } = require("../../models/Offers/contracting.model");

class Contracting_Controller {
  Get(req, res, next) {
    ContractingModal.find()

      .populate("id_candidates")
      .populate("id_proveedor")
      .populate("id_offers")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener Contrato", error });
      })
      
  }

  async Post(req, res, next) {
    try {
      const result = new ContractingModal(req.body);
      const response = await result.save();
      res.status(201).json({ type: "Success", response: response });
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.Nombre_Servicio
      ) {
        res.status(409).json({
          error: "El nombre del estado ya esta en uso",
        });
      } else {
        console.log(error);
        res.status(500).json({ error: "Error al crear el documento" });
      }
    } 
  }
  async GetId(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ContractingModal.find({
        _id: new ObjectId(id),
      })
        .populate("id_candidates")
        .populate("id_proveedor")
        .populate("id_offers");
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .send("No se encontró ningún documento con el ID proporcionado.");
      }
    } catch (error) {
      console.log("error" + error);
    } 
  }
  async Put(req, res, next) {
    const Update = req.body;
    const id = req.params.id;
    try {
      const result = await ContractingModal.findOneAndUpdate(
        { _id: new ObjectId(id) },
        Update,
        { new: true }
      );

      if (result) {
        res
          .status(200)
          .json({ message: "Documento actualizado exitosamente\n", result });
      } else {
        res.status(500).json({ error: "Error al actualizar el documento" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    } 
  }
  async Delete(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ContractingModal.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (result) {
        res.status(200).send({ message: "Borrado con éxito", result });
      } else {
        res.status(500).send({ error: "Error al eliminar el archivo" });
      }
    } catch (error) {
      console.log(error);
    } 
  }
}
module.exports = { Contracting_Controller };
