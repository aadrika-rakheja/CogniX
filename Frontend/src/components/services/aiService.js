import axios from "axios";

const API_URL="https://cognix-v9mv.onrender.com/ai-tut";

export const callGenAi=async({message,subj,topic,mood})=>{
    try{
        const response=await axios.post(API_URL,{message,subj,topic,mood});
        return response.data;
    }catch(err){
        return err.message;
    }   
};