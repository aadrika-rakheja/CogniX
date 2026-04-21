const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();
const connectDB=require("./config/db");
connectDB();
const app=express();

app.use(cors({origin: "*"}));
app.use(express.json());


const topicRoutes=require("./routes/topicRoutes");
app.use("/topics",topicRoutes);

const subjRoutes=require("./routes/subjRoutes");
app.use("/Subjects",subjRoutes);

const aiRoutes=require("./routes/aiRoutes");
app.use("/ai-tut",aiRoutes);

const userProgressRoutes=require("./routes/userProgressRoutes");
app.use("/userProgress",userProgressRoutes);

const ProgressRouters=require("./routes/ProgressRoutes");
app.use("/api/progress",ProgressRouters);

app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/games",require("./routes/GamesRouter"));
app.use("/api/questions", require("./routes/QuestionsRoute"));
app.use("/api/topics", require("./routes/requireTopicRoutes"));



const discussionRoutes = require("./routes/discussionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/discussions", discussionRoutes);
app.use("/api/notifications", notificationRoutes);

module.exports=app;