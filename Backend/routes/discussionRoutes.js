const express = require("express");
const router = express.Router();

const {
  getDiscussions,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  upvoteDiscussion,
  addComment
} = require("../controllers/discussionController");

// GET
router.get("/", getDiscussions);

// POST
router.post("/", createDiscussion);

// UPDATE
router.put("/:id", updateDiscussion);

// DELETE
router.delete("/:id", deleteDiscussion);

// UPVOTE
router.patch("/:id/upvote", upvoteDiscussion);

// COMMENT
router.post("/:id/comment", addComment);

module.exports = router;