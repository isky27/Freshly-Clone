const dotenv = require("dotenv");

dotenv.config();
const mongoose = require("mongoose");
const connection = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connection;
