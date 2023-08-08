// WARNING ⚠️ extremo peligro ⬇️
const deleteData = async (Models, db) => {
  try {
    await db.connect();
    const result = await Models.aggregate([{ $sample: { size: 50 } }]).exec();

    let i = 1;
    for (let documento of result) {
      console.log(i);
      await Models.deleteOne({ _id: documento._id });
      i++;
    }

    console.log(`Se han eliminado ${result.length} documentos`);
  } catch (error) {
    console.log("el error es ->" + error);
  } finally {
    await db.close();
  }
};
module.exports = {
  deleteData,
};
