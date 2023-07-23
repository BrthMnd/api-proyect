const faker = require("faker");
const { connectDB } = require("../database/db");

// Codigos reutilizables 🔄
const pruebaDatos = () => {
  data = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
  };
  return data;
};

//faker
const dataFaker = async () => {
  let Arreglo = [];
  for (let i = 0; i < 50; i++) {
    let data = pruebaDatos();
    await Arreglo.push(data);
  }
  //   console.log(Arreglo);
  subirDatosfalsos(Arreglo);
};

const subirDatosfalsos = async (data) => {
  // WARNING ⬇️
  const collection_actual = "prueba";
  // WARNING ⬆️
  const client = await connectDB(collection_actual);
  const result = await client.insertMany(data);
  if (result) {
    console.log("Datos Subidos con Exit ✅");
  } else {
    console.error("no lograron subirse los datos ❌");
  }
};
// WARNING ⚠️ extremo peligro ⬇️
const borrarDatosFalsos = async () => {
  const collection_actual = "prueba";
  const client = await connectDB(collection_actual);
  const result = await client.aggregate([{ $sample: { size: 10 } }]).toArray();
  let i = 1;

  for (let documento of result) {
    console.log(i);
    await client.deleteOne({ _id: documento._id });
    i++;
  }
  console.log(`Se han eliminado ${result.length} documentos`);
};

dataFaker();
// borrarDatosFalsos();
