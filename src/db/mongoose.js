const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("mongodb successfully connected");
  } catch (error) {
    console.log("Error while connection to mongodb: ", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
