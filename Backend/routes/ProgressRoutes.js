const express = require("express");
const router = express.Router();

const { saveProgress, getUserProgress } = require("../controllers/ProgressController");
const authMiddleware = require("../middleware/authMiddlewear");

// GET progress
router.get("/", authMiddleware, getUserProgress);

// SAVE progress
router.post("/", authMiddleware, saveProgress);

module.exports = router;