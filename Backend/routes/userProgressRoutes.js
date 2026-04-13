const express=require("express");
const authMiddlewear = require("../middleware/authMiddlewear");

const router=express.Router();
const {getUserProgress,updateUserProgress}=require('../controllers/userProgressController');

router.post("/updateUserProgress",authMiddlewear,updateUserProgress);
router.get("/",authMiddlewear,getUserProgress);

module.exports=router;