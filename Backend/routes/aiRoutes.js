const express = require("express");
const router = express.Router();
const { askTutor } = require("../controllers/aiController");

router.post("/", askTutor);

module.exports = router;