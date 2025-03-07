const express = require("express");
const connectToDb = require("./db/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectToDb();
  console.log("Listening on PORT: " + PORT);
});
