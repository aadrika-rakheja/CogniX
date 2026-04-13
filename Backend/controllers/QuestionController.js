const Question = require("../models/Questions");

// ✅ GET QUESTIONS BY TOPIC
const getQuestionsByTopic = async (req, res) => {
  try {
    const { topic } = req.params;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const questions = await Question.find({
      topic: topic.trim().toLowerCase(), // ✅ FIXED
    });

    return res.status(200).json({
      success: true,
      questions,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching questions",
    });
  }
};

// (keep your addQuestion if you use it)
const addQuestion = async (req, res) => {
  try {
    const { topic, question, options, answer } = req.body;

    const newQuestion = await Question.create({
      topic: topic.trim().toLowerCase(), // ✅ FIXED
      question,
      options,
      answer,
    });

    res.status(201).json({
      success: true,
      message: "Question added",
      data: newQuestion,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding question",
    });
  }
};

module.exports = {
  getQuestionsByTopic,
  addQuestion,
};