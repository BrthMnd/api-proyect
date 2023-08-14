const faker = require("faker");
const { Prueba2Models } = require("../models/prueba2");
const { DatabaseConnector } = require("../config/db");

const CrearPrueba = async () => {
  try {
    await db.connect();
    const prueba2 = await Prueba2Models({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      friend: "64d187f9652a9e9d5688c50a",
    });
    const result = await prueba2.save();
    console.log("\n\n\t*** inserted ***\n\n");
  } catch (e) {
    console.log("*** ERROR *** ⏬ " + e);
  } finally {
    await db.close();
  }
};
const getPrueba = async () => {
  try {
    await db.connect();
    const r = await Prueba2Models.find({}).populate("friend");
    for (let i of r) {
      console.log(i);
    }
  } catch (e) {
    console.log("*** ERROR *** ⏬ \n\n" + e);
  } finally {
    await db.close();
  }
};

getPrueba();
