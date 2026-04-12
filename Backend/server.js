const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB = require("./config/database");
const ProgressRouters=require("./routes/ProgressRoutes");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/progress", require("./routes/ProgressRoutes"));

connectDB();

app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/games",require("./routes/GamesRouter"));
app.use("/api/progress",ProgressRouters);
app.use("/api/questions", require("./routes/QuestionsRoute"));
app.use("/api/topics", require("./routes/TopicRoutes"));

app.listen(8000,()=>
{
    console.log("Server is running at Port number 8000");
});

