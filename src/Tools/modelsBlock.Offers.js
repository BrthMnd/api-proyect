const faker = require("faker");
const rd = require("lodash");

const pruebaDatos = () => {
  let collection = "prueba";
  let randomMonth = rd.random(1, 12);
  let randomYear = rd.random(1995, 2020);
  let randomDayOfMonth = rd.random(1, 30);

  data = {
    avatar: faker.image.avatar(),
    birthday: `${randomDayOfMonth}/${randomMonth}/${randomYear}`,
    email: faker.internet.email(),
    age: rd.random(5, 30),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    subscriptionTier: `${faker.random.arrayElement([
      "free",
      "basic",
      "business",
    ])}`,
  };
  return { data, collection };
};
const modelsOffers = () => {
  let collection = "offers";
  let now = new Date();
  let date = `${now.getDate()}/${now.getMonth() + 1}/${
    now.getFullYear
  } hora: ${now.getHours()}:${now.getMinutes}`;

  data = {
    id_provider: "64cb04275eca5e0d3ac21a25",
    id_status: "",
    description: faker.lorem.sentences(),
    publicationDate: date,
    endDate: "",
  };
  return { data, collection };
};
const modelsContratingState = () => {
  let collection = "status";
  let data = {
    status: faker.random.arrayElement([
      "Aplicando",
      "Cotizacion",
      "En Proceso",
      "Terminado",
    ]),
    description: faker.lorem.sentences(),
  };
  return { data, collection };
};
const modelsStatus = () => {
  let collection = "status";
  let data = {
    status: faker.random.arrayElement(["Activo", "Inactivo"]),
    description: faker.lorem.sentences(),
  };
  return { data, collection };
};
const modelsSuppliers = () => {
  let collection = "suppliers";
  let data = {
    id_Offers: "",
    id_ServiceProvider: "",
    id_ContratingState: "",
    dateOfRegistration: "",
  };
  return { data, collection };
};
const modelsStatus_Offers = () => {
  let collection = "status_offers";
  let data = {};
};

module.exports = {
  pruebaDatos,
  modelsStatus,
  modelsOffers,
  modelsSuppliers,
  modelsContratingState,
  modelsStatus_Offers,
};
