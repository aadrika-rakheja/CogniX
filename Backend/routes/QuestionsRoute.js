const express = require("express");
const router = express.Router();

const {
  getQuestionsByTopic,
  createQuestion,
  deleteQuestion,
} = require("../controllers/QuestionController");

// ✅ GET questions by topic
router.get("/:topic", getQuestionsByTopic);

// ✅ ADD QUESTION (FIX FOR YOUR ERROR)
router.post("/", createQuestion);

// ✅ DELETE QUESTION
router.delete("/:id", deleteQuestion);

module.exports = router;