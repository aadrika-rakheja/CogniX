const Topic = require("../models/Topic");

// ✅ ADD TOPIC (ADMIN)
const addTopic = async (req, res) => {
  try {
    const { name, title, description } = req.body;

    if (!name || !title) {
      return res.status(400).json({
        success: false,
        message: "Name and title are required",
      });
    }

    const existingTopic = await Topic.findOne({ name: name.toLowerCase() });
    if (existingTopic) {
      return res.status(400).json({
        success: false,
        message: "Topic with this name already exists",
      });
    }

    const newTopic = await Topic.create({
      name: name.toLowerCase(),
      title,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Topic added",
      data: newTopic,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding topic",
    });
  }
};

// ✅ GET ALL TOPICS
const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      topics,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching topics",
    });
  }
};

// ✅ UPDATE TOPIC (ADMIN)
const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, description } = req.body;

    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { name: name.toLowerCase(), title, description },
      { new: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Topic updated",
      data: updatedTopic,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating topic",
    });
  }
};

// ✅ DELETE TOPIC (ADMIN)
const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Topic deleted",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting topic",
    });
  }
};

module.exports = { addTopic, getAllTopics, updateTopic, deleteTopic };