const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: String, // receiver

  type: {
    type: String,
    enum: ["like", "comment", "reply"],
  },

  message: String,

  discussionId: mongoose.Schema.Types.ObjectId,

  isRead: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);