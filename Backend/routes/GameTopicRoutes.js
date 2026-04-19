const express = require("express");
const router = express.Router();
const Topic = require("../models/GamesTopic");
// ✅ GET ALL TOPICS
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json({ success: true, topics });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ✅ CREATE TOPIC
router.post("/", async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.json({ success: true, topic });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;