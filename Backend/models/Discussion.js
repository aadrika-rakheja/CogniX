const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  author: String,
  authorEmail: String,
  authorId: String,

  upvotes: {
    type: Number,
    default: 0,
  },

  upvotedBy: [
    {
      type: String, // userId
    },
  ],

  comments: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      },
      text: String,
      author: String,
      authorEmail: String,
      authorId: String,
      parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null, // null = top-level comment
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Discussion", discussionSchema);