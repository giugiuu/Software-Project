const express = require("express");
const connectToDb = require("./db/mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api/v1", require("./api/v1/routes/index"));

app.listen(PORT, async () => {
  await connectToDb();
  console.log("Listening on PORT: " + PORT);
});
