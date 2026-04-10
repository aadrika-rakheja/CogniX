const mongoose=require("mongoose");

const topicSchema=mongoose.Schema({
    symbolTopic:{
        type:String,
        default:"💠"
    },
    title:{
        type:String,
        required:true
    },
    subjName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    },
    desc:{
        type:String
    },
    level:{
        type:String,
        enum:["Beginner","Intermediate","Advanced"],
        default:"Intermediate"
    },
    order:{
        type:Number,
        required:true,
    },
    content:{
        type:{
            type:String,
           default:"Video"
        },
        link:String,
        duration:Number
    }
});

module.exports=mongoose.model("Topics",topicSchema);