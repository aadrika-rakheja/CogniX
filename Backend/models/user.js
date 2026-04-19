const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    email: 
    {
        type:String,
        required:true,
        unique:true
    },

    password:
    {
        type:String,
        required:true
    },

    role: 
    {
            type:String,
            require:true,
            enum:["user","admin"],
            default:"user"
    }
});

module.exports= mongoose.models.user || mongoose.model("user", userSchema);

