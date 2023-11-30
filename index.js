require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3002;

const server = app.listen(PORT, () => {
  console.log(`***  http://localhost:${PORT}/api/ ***`);
});

process.on("SIGINT", () => {
  console.log("Proceso terminado");
  server.close(() => {
    console.log("Servidor cerrado.");
    process.exit(0);
  });
});
