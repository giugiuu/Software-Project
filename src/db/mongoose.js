const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/event-project");

    console.log("mongodb successfully connected");
  } catch (error) {
    console.log("Error while connection to mongodb: ", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
