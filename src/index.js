const express = require("express");
require("./src/db/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on PORT: " + PORT);
});
