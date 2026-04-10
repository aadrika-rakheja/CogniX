const mongoose=require("mongoose");
const MONGO_URI=process.env.MONGO_URI;

const connect=async()=>{
    try{
        await mongoose.createConnection(MONGO_URI);
        console.log("user Database Connected");
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}

module.exports=connect;
