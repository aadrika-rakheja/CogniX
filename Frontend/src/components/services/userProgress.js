import axios from "axios"

const API_URL="http://localhost:2424/userProgress";

export const getUserProgress=async()=>{
    const userProgress=await axios.get(`${API_URL}/`);
    return userProgress.data;
};

export const updateUserProgress=async(upd)=>{
    const progress=await axios.post(`${API_URL}/updateUserProgress`,upd);
    return progress.data;
}

