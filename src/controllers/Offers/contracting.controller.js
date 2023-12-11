const { ObjectId } = require("mongodb");
const { ContractingModal } = require("../../models/Offers/contracting.model");
const { CandidateModel } = require("../../models/Offers/candidate.model");
const { OffersModel } = require("../../models/Offers/offers.model");
const {
  SendEmail,
  TemplateEmail,
  NotificationTemplate,
} = require("../../tools/template.tools");
const { UserModel } = require("../../models/Users/users.models");

class Contracting_Controller {
  Get(req, res, next) {
    ContractingModal.find()
      .populate({
        path: "id_candidates",
        populate: { path: "selectedCandidate" },
      })
      .populate("id_provider")
      .populate({
        path: "id_offers",
        populate: [{ path: "id_property" }, { path: "id_service" }],
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al obtener Contrato", error });
      });
  }

  async Post(req, res, next) {
    const { id_candidates, id_provider, id_offers } = req.body;
    try {
      const result = new ContractingModal({
        id_candidates,
        id_provider,
        id_offers,
      });
      const response = await result.save();
      if (!response) {
        return res
          .status(400)
          .json({ message: "A ocurrido un error 1", response });
      }
      const update_candidate = await CandidateModel.findByIdAndUpdate(
        { _id: new ObjectId(id_candidates) },
        { selectedCandidate: id_provider },
        { new: true }
      );

      if (!update_candidate) {
        return res
          .status(400)
          .json({ message: "A ocurrido un error 2", update_candidate });
      }
      const update_offers = await OffersModel.findByIdAndUpdate(
        { _id: new ObjectId(id_offers) },
        { state: "Cotizado" },
        { new: true }
      ).populate("id_property");
      if (!update_offers) {
        return res
          .status(400)
          .json({ message: "A ocurrido un error 3", update_offers });
      }
      console.log("ID DE PROVEEDOR: ${id_provider}", id_provider);
      const user = await UserModel.findOneAndUpdate(
        { roleRef: id_provider },
        { status: true },
        { new: true }
      );
      if (!user) {
        return res
          .status(400)
          .json({ message: "A ocurrido un error en usuario 4", user });
      }

      await SendEmail(
        user.email,
        "¡Felicidades! Fuiste elegido en una oferta de RcService.",
        NotificationTemplate(
          user.email,
          `Has sido elegido para la oferta con la siguiente descripción: ${update_offers.description}. Direccion: ${update_offers.id_property.direccion}`
        )
      );

      res.status(201).json({ message: "Success", response: response });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Error al crear el documento", error });
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
      "error" + error;
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
      error;
      res.status(500).json({ error: error });
    }
  }
  async Delete(req, res, next) {
    const id = req.params.id;
    try {
      const contract_response = await ContractingModal.findOne({
        _id: new ObjectId(id),
      });

      console.log(
        "🚀 ~ file: contracting.controller.js:138 ~ Contracting_Controller ~ Delete ~ contract_response:",
        contract_response
      );
      if (!contract_response)
        return res.status(400).json({
          message: "Contrato no encontrado",
          error: contract_response,
        });
      if (!contract_response.id_provider) {
        console.log("no paso");
        return res.status(400).json({
          message: "Proveedor de contrato no encontrado",
          error: contract_response,
        });
      }
      const response_user = await UserModel.findOneAndUpdate(
        {
          roleRef: contract_response.id_provider,
        },
        { status: false },
        { new: true }
      );
      console.log(
        "🚀 ~ file: contracting.controller.js:162 ~ Contracting_Controller ~ Delete ~ response_user:",
        response_user
      );

      if (!response_user) {
        return res.status(400).json({
          message: "Usuario no encontrado",
          error: response_user,
        });
      }

      const response_offers = await OffersModel.findOneAndUpdate(
        { _id: new ObjectId(contract_response.id_offers._id) },
        { state: "Disponible" },
        { new: true }
      );
      if (!response_user)
        return res.status(400).json({
          message: "Usuario no encontrado",
          error: response_user,
        });
      const delete_contract = await ContractingModal.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!delete_contract)
        res.json({
          message: "Error al eliminar contrato",
          error: delete_contract,
        });

      res.status(200).send({
        message: "Borrado con éxito",
        result: { delete_contract, response_user, contract_response },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar el archivo", error });
    }
  }
}
module.exports = { Contracting_Controller };
