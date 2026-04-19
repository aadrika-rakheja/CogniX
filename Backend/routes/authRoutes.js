const express = require("express");
const router = express.Router();

const {
  loginUser,
  signupUser,
} = require("../controllers/AuthController");

router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;