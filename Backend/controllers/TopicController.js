const Topics=require("../models/Topics");



const createTopic=async(req , res)=>{
    try{
        const data=req.body;
        const top=new Topics(data);
        await top.save();
        res.status(201).json({
            msg:"Topic added successfully"
        });
    }catch(e){
        console.log(e.messsage);
        res.status(400).json({
            msg:"Unable to add topic",
            error:e.messsage
        });
    }
}

const getTopics=async(req,res)=>{
    try{
        const data=await Topics.find();
        res.json(data);
    }catch(err){
        res.json({
            fail:"Unable to fetch topics",
            meassage:err.messsage
        });
    }
}


const getAllTopicsBySubj=async(req,res)=>{
    try{
        const subj=req.params.id;
        const data=await Topics.find({subjName:subj});
        res.json(data);
    }
    catch (err)
    {
        console.log(err);
        res.json({
            fail:"Unable to fetch topics",
            meassage:err.messsage
        })
    }
}

const getTopicsById=async(req,res)=>{
    try{
        const tid=req.params.tid;
        const data=await Topics.find({_id:tid});
        res.json(data);
    }catch(err){
        res.json({
            fail:"Unable to fetch topic by its id",
            meassage:err.messsage
        });
    }
}

const deleteTopic=async(req,res)=>{
    try{
        const t_id=req.params.tid;
        await Topics.findByIdAndDelete(t_id);
        res.status(200).json({
            msg:"Topic deleted successfully"
        })
    }catch(err){
        res.status(400).json({
            msg:"Unable to delete topic"
        })
    }
}

module.exports={createTopic,getAllTopicsBySubj,getTopics,getTopicsById,deleteTopic};
