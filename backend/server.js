require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const discussionRoutes = require("./routes/discussionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();

    app.use("/api/discussions", discussionRoutes);
    app.use("/api/notifications", notificationRoutes);

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();