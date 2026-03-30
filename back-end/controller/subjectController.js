const Subject=require("../models/Subjects");

const createSubject=async(req,res)=>{
   try{
        const data=new Subject(req.body);
        const subj=await data.save();
        res.status(201).json({
            msg:"New subject created",
            data:subj
        });
   }
   catch(e){
    res.status(500).json({
        msg:"Subject not created",
        error:e.message
    });
   }
}

const getAllSubjects=async(req,res)=>{
    try{
        const subjects=await Subject.find();
        res.json(subjects);
    }
    catch(e)
    {
         res.status(500).json({
            msg:"Unable to fetch all subjects",
            error:e.message
        });
    }
}


const deleteSubject=async(req,res)=>{
    try{
        const id=req.params.id;
        await Subject.findByIdAndDelete(id);
        res.status(200).json({
            msg:"Subject Deleted Successfully"
        });
    }
    catch(e){
        res.status(400).json({
            msg:"Unable to delete subject",
            error:e.message
        });
    }
}

const findByIDSubject=async(req,res)=>{
     try{
        const id=req.params.id;
        const d=await Subject.findById(id);
        res.status(200).json({
            data:d
        });
    }
    catch(e){
        res.status(400).json({
            msg:"Unable to find subject",
            error:e.message
        });
    }
}


module.exports={createSubject, getAllSubjects,deleteSubject,findByIDSubject}