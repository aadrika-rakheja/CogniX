const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");

const authMiddlewear = require("../middleware/authMiddlewear");
const adminMiddlewear = require("../middleware/adminMiddlewear");

// ✅ GET QUESTIONS BY TOPIC (PUBLIC)
router.get("/:topic", async (req, res) => {
  try {
    const questions = await Question.find({
      topic: req.params.topic,
    });

    res.json({ success: true, questions });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ✅ ADD QUESTION (ADMIN)
router.post("/", authMiddlewear, adminMiddlewear, async (req, res) => {
  try {
    const { question, options, answer, topic } = req.body;

    const newQuestion = await Question.create({
      question,
      options,
      answer,
      topic,
    });

    res.json({ success: true, question: newQuestion });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ✅ UPDATE QUESTION
router.put("/:id", authMiddlewear, adminMiddlewear, async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ✅ DELETE QUESTION
router.delete("/:id", authMiddlewear, adminMiddlewear, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;