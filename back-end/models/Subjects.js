const mongoose=require("mongoose");

const SubjSchema=mongoose.Schema({
    symbol:{
        type:String,
        default:"📘"
    },
    subjName:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String
    }
});

module.exports=mongoose.model("Subject",SubjSchema);