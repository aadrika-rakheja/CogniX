const express = require("express");
const router = express.Router();
const { askTutor } = require("../controller/aiController");

router.post("/", askTutor);

module.exports = router;