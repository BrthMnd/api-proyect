// Importamos el modelo de la DB mongo

const createOwner = async (req, res) => {
  try {
    res.status(200).send({
      resp: true,
    });
  } catch (error) {
    res.status(500).send({
      resp: false,
    });
  }
};

const getOwners = async (req, res) => {
  try {
    res.status(200).send({
      resp: true,
    });
  } catch (error) {
    res.status(500).send({
      resp: false,
    });
  }
};

const getOwnerById = async (req, res) => {
  try {
    res.status(200).send({
      resp: true,
    });
  } catch (error) {
    res.status(500).send({
      resp: false,
    });
  }
};

const updateOwner = async (req, res) => {
  try {
    res.status(200).send({
      resp: true,
    });
  } catch (error) {
    res.status(500).send({
      resp: false,
    });
  }
};

module.exports = {
  createOwner,
  getOwners,
  getOwnerById,
  updateOwner,
};
