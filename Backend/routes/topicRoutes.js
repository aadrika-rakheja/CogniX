const express=require("express");
const {createTopic,getAllTopicsBySubj,getTopics, getTopicsById,deleteTopic}=require("../controllers/topicController");
const router=express.Router();

router.post("/createTopic",createTopic);
router.get("/getTopics",getTopics);
router.delete("/:id/:tid", deleteTopic);
router.get("/:id/video/:tid",getTopicsById);
router.get("/:id",getAllTopicsBySubj);

module.exports=router;