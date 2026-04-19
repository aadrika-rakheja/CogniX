const Progress = require("../models/Progress");

// GET
const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find();

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// SAVE
const saveProgress = async (req, res) => {
  try {
    const { topic, score, totalQuestions } = req.body;

    if (!topic || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing data",
      });
    }

    const newProgress = await Progress.create({
      topic,
      score,
      totalQuestions,
    });

    res.status(201).json({
      success: true,
      data: newProgress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getUserProgress, saveProgress };