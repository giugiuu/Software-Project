const express = require("express");
const connectToDb = require("./db/mongoose");
const userRouter = require('../src/routers/user')



require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(userRouter)

app.listen(PORT, async () => {
  await connectToDb();
  console.log("Listening on PORT: " + PORT);
});
