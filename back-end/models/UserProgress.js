const mongoose=require("mongoose");

const userProgressSchema=mongoose.Schema({
    userName:{
        type:"String"
    },
    userId:mongoose.Schema.Types.ObjectId,
    Streak:{
        type:Number,
        default:0
    },
    totTime:{
        type:Number,
        default:0,
    },
    courseProgress:[
        {
            course_id: mongoose.Schema.Types.ObjectId,
            course_status:{
                type:"String",
                enum:["Completed", "In-progress","Not Started"]
            },
            topicProgress:[
                {
                    topic_id:mongoose.Schema.Types.ObjectId,
                    watchedTime:Number
                }
            ]
        }
    ]
});


module.exports=mongoose.model("UserProgress", userProgressSchema);
