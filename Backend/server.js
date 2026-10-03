const app=require("./app");
const PORT=process.env.PORT || 2424;

app.listen( PORT,()=>{
    console.log("Server started at port ",PORT);
})
