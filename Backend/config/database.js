const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.createConnection(process.env.MONGO_URI);
    console.log(" User MongoDB connected ..");
  } catch (error) {
    console.log("Database Error", error);
    process.exit(1);
  }
};

module.exports = connect;