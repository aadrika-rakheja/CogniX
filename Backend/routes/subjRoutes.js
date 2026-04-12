const express=require("express");
const routes=express.Router();

const {createSubject, getAllSubjects,deleteSubject,findByIDSubject}=require("../controllers/subjectController");

routes.get("/getAllSubjects",getAllSubjects);
routes.post("/createSubject",createSubject);
routes.get("/:id",findByIDSubject);
routes.delete("/:id",deleteSubject);

module.exports=routes;