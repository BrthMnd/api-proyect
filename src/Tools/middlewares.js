const { DatabaseConnector } = require("../database/db");

const middlewaresUpData = async (data, collection, db) => {
  try {
    await db.connect();
    const client = await db.getCollection(collection);
    const result = await client.insertMany(data);

    if (result) {
      console.log("Datos Subidos con Exito ✅");
    } else {
      console.error("no lograron subirse los datos ❌");
    }
  } catch (error) {
    console.log("Error -> " + error);
  } finally {
    await db.close();
  }
};

// WARNING ⚠️ extremo peligro ⬇️
const middlewaresDeleteData = async (collection_actual, db) => {
  try {
    await db.connect();
    const client = db.getCollection(collection_actual);
    const result = await client
      .aggregate([{ $sample: { size: 25 } }])
      .toArray();

    let i = 1;
    for (let documento of result) {
      console.log(i);
      await client.deleteOne({ _id: documento._id });
      i++;
    }
    await console.log(`Se han eliminado ${result.length} documentos`);
  } catch (error) {
    console.log("el error es ->" + error);
  } finally {
    await db.close();
  }
};

module.exports = {
  middlewaresUpData,
  middlewaresDeleteData,
};
