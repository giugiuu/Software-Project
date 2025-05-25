const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
    await mongoose.connect(mongoUri);
    console.log("mongodb successfully connected");
  } catch (error) {
    console.log("Error while connection to mongodb: ", error);
    // Don't exit the process, just log the error
    console.log("Continuing without database connection...");
  }
};

module.exports = connectToDb;
