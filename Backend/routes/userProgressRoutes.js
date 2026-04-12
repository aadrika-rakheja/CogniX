const express=require("express");
const router=express.Router();
const {initializeUserProgress,getUserProgress,updateUserProgress}=require('../controllers/userProgressController');

router.post("/createUserProgress",initializeUserProgress);
router.post("/updateUserProgress",updateUserProgress);
router.get("/",getUserProgress);

module.exports=router;