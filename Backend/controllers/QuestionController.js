const Questions = require("../models/Questions");

// ✅ ADD QUESTION (ADMIN)
const addQuestion = async (req, res) => {
  try {
    const { topic, question, options, answer } = req.body;

    if (!topic || !question || !options || !answer) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newQuestion = await Questions.create({
      topic: topic.toLowerCase(), // ✅ normalize
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

// ✅ GET QUESTIONS (USER)
const getQuestionsByTopic = async (req, res) => {
  try {
    const { topic } = req.params;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const questions = await Questions.find({
      topic: topic.toLowerCase(), // ✅ exact match (BEST)
    });

    res.status(200).json({
      success: true,
      questions,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching questions",
    });
  }
};

module.exports = { addQuestion, getQuestionsByTopic };