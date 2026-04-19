const Question = require("../models/Questions");

// ✅ GET QUESTIONS
const getQuestionsByTopic = async (req, res) => {
  try {
    const topic = req.params.topic.toLowerCase();
    const questions = await Question.find({ topic });

    res.json({
      success: true,
      questions,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// ✅ CREATE QUESTION (🔥 THIS FIXES POST ERROR)
const createQuestion = async (req, res) => {
  try {
    const { question, options, answer, topic } = req.body;

    if (!question || !options || !answer || !topic) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const newQuestion = await Question.create({
      question,
      options,
      answer,
      topic: topic.toLowerCase(),
    });

    res.status(201).json({
      success: true,
      question: newQuestion,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ DELETE QUESTION (🔥 FIX DELETE ERROR)
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.json({
      success: true,
      message: "Question deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  getQuestionsByTopic,
  createQuestion,
  deleteQuestion,
};