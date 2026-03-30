const {GoogleGenerativeAI}=require('@google/generative-ai');
const genAI=new GoogleGenerativeAI(process.env.GEMINI_KEY);

const askTutor=async(req,res)=>{
    try{
        const {message,subj,topic,mood}=req.body;
        if(!message)
            return res.status(400).json({error:"Message is required" });

        const model=genAI.getGenerativeModel({model:"gemini-2.5-flash-lite" });

        const prompt=`
            You are an AI tutor for a college Computer Science student.

            Current Subject: ${subj || "General"}
            Current Topic: ${topic || "General Topic"}
            Student Mood: ${mood || "neutral"}

            Instructions:
            - Explain clearly and simply
            - Be concise but helpful
            - If student seems confused or stressed, explain gently and step-by-step
            - If possible, use one simple example
            - Keep answer suitable for a college student
            - Do not give overly advanced jargon unless askedS

            Student Question:
            ${message}
            `;
        const result=await model.generateContent(prompt);
        const response=await result.response;
        const text=response.text();
        res.status(200).json({reply:text});
    }
    catch(err)
    {
        console.error("Gemini error:",err);
        res.status(500).json({error:"Something went wrong by ai tutor"});
    }
};

module.exports={askTutor};