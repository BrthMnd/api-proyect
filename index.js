require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3002;

// * Listen -> Port
const server = app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
