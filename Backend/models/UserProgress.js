const mongoose=require("mongoose");

const userProgressSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    streak:{
        type:Number,
        default:0
    },
    lastActiveDate: {
        type: Date,
        default: null
    },
    totTime:{
        type:Number,
        default:0,
    },
    courseProgress:[
        {
            course_id:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Subjects"
            },
            course_status:{
                type:String,
                enum:["Completed", "In-progress","Not Started"],
                default:"Not Started"
            },
            topicProgress:[
                {
                    topic_id:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Topics",
                        required:true
                    },
                    watchedTime:{
                        type:Number,
                        default:0
                    },
                    topic_status:{
                        type:"String",
                        enum:["Completed", "In-progress","Not Started"],
                        default:"Not Started"
                    }
                }
            ]
        }
    ]
},
{
    timestamps:true
});


module.exports=mongoose.model("UserProgress", userProgressSchema);
