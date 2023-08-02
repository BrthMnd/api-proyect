const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3002;

// * Listen -> Port
app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
