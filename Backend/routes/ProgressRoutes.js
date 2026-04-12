const express = require("express");
const router = express.Router();

const { saveProgress, getMyProgress } = require("../controllers/ProgressController");

const authMiddlewear = require("../middleware/authMiddlewear");

// save progress
router.post("/", authMiddlewear, saveProgress);

// get progress
router.get("/", authMiddlewear, getMyProgress);

module.exports = router;