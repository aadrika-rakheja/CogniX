const {GoogleGenerativeAI}=require('@google/generative-ai');
const detectMoodFromMessage = require('../services/moodService');
const genAI=new GoogleGenerativeAI(process.env.GEMINI_KEY);

const askTutor=async(req,res)=>{
    try{
        const {message,subj,topic,mood}=req.body;
        if(!message)
            return res.status(400).json({error:"Message is required" });

        const currMood=await detectMoodFromMessage(message,mood);

        const model=genAI.getGenerativeModel({model:"gemini-2.5-flash-lite" });

        const prompt=`
            You are an AI tutor for a college Computer Science student.

            Current Subject: ${subj || "General"}
            Current Topic: ${topic || "General Topic"}
            Student Mood: ${currMood || "neutral"}

            Adapt your teaching style based on mood:
                - Neutral → explain normally
                - Confused → explain simply and step-by-step
                - Engaged → provide slightly deeper explanation and challenge
                - Bored → keep it interactive and practical
                - Stressed → keep it concise, calm, and exam-focused
                - Frustrated → be patient, simplify, and use examples

            Instructions:
                - Explain clearly and simply
                - Be concise but helpful
                - Use one simple example if useful
                - Keep answer suitable for a college student
                - Avoid unnecessary jargon unless asked

            Student Question:
            ${message}
            `;
        const result=await model.generateContent(prompt);
        const response=await result.response;
        const text=response.text();
        res.status(200).json({reply:text, mood:currMood});
    }
    catch(err)
    {
        console.error("Gemini error:",err);
        res.status(500).json({error:"Something went wrong by ai tutor"});
    }
};



module.exports={askTutor};