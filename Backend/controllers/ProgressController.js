const Progress = require("../models/Progress");

const getUserId = (req) => req?.user?.id;

// ✅ SAVE PROGRESS
const saveProgress = async (req, res) => {
  try {
    const { topic, score, totalQuestions } = req.body;

    // 🔥 ADDED: Safety check for user
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found in token",
      });
    }

    // 🔥 ADDED: Debug log
    console.log("Saving for user:", req.user.id);

    const newProgress = await Progress.create({
      user: getUserId(req),
      topic,
      score,
      totalQuestions,
    });

    res.status(201).json({
      success: true,
      data: newProgress,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error saving progress",
    });
  }
};

// ✅ GET USER PROGRESS
const getMyProgress = async (req, res) => {
  try {
    // 🔥 ADDED: Safety check
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 🔥 ADDED: Debug log
    console.log("Fetching progress for user:", req.user.id);

    const data = await Progress.find({ user: req.user.id });

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching progress",
    });
  }
};

module.exports = { saveProgress, getMyProgress };