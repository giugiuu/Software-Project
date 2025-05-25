const express = require("express");
const connectToDb = require("./db/mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// Import routes
const apiRoutes = require("./api/v1/routes/index");
app.use("/api/v1", apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.listen(PORT, async () => {
  await connectToDb();
  console.log("Server is running on PORT: " + PORT);
});
