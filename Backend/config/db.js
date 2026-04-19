const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://goeluplaksh:8Pr44jYVLbb0HL6E@cluster0.kaubuao.mongodb.net/?appName=Cluster0");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB ERROR:", error.message);
    throw error;
  }
};

module.exports = connectDB;