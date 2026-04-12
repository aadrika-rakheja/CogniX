const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();
const connectDB=require("./config/db");
connectDB();
const connect=require("./config/userDB");
connect();
const app=express();

app.use(cors());
app.use(express.json());


const topicRoutes=require("./routes/topicRoutes");
app.use("/topics",topicRoutes);

const subjRoutes=require("./routes/subjRoutes");
app.use("/Subjects",subjRoutes);

const aiRoutes=require("./routes/aiRoutes");
app.use("/ai-tut",aiRoutes);

const userProgressRoutes=require("./routes/userProgressRoutes");
app.use("/userProgress",userProgressRoutes);

module.exports=app;