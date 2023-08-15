const faker = require("faker");
const { PruebaModels } = require("../models/prueba.models");
const { DatabaseConnector } = require("../config/db");
const db = new DatabaseConnector();

const CrearPrueba = async () => {
  try {
    await db.connect();
    for (let i = 0; i < 20; i++) {
      let prueba = new PruebaModels({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        age: faker.datatype.number({ min: 10, max: 20 }),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
      });
      await prueba.save();
      console.log(i + 1);
    }
  } catch (e) {
    console.log("*** ERROR *** -> " + e);
  } finally {
    await db.close();
  }
};

CrearPrueba();
