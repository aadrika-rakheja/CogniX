const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

const protect = require("../middleware/auth"); // JWT middleware
const adminMiddleware = require("../middleware/adminMiddleware");

// ➕ ADD QUESTION
router.post("/", protect, adminMiddleware, async (req, res) => {
  try {
    const { topic, question, options, answer } = req.body;

    const newQ = await Question.create({
      topic,
      question,
      options,
      answer,
    });

    res.json({ success: true, question: newQ });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 GET QUESTIONS BY TOPIC
router.get("/:topic", async (req, res) => {
  try {
    const questions = await Question.find({
      topic: req.params.topic,
    });

    res.json({ success: true, questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE QUESTION
router.put("/:id", protect, adminMiddleware, async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, question: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE QUESTION
router.delete("/:id", protect, adminMiddleware, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;