const path = require("path");
const fs = require("fs-extra");
class Images_controllers {
  async Get(req, res) {
    try {
      const image = req.params.image;
      const pathImage = path.resolve(__dirname, `../assets/img/${image}`);
      if (await fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
      } else {
        const pathImage = path.resolve(
          __dirname,
          `../assets/img/no-pictures.png`
        );
        res.sendFile(pathImage);
      }
    } catch (error) {
      error;
    }
  }
}
module.exports = { Images_controllers };
