import axios from "axios"
import { getAuthHeader } from "../../utils/authUtils";

const API_URL="http://localhost:2424/userProgress";

export const getUserProgress=async()=>{
    const userProgress=await axios.get(`${API_URL}/`, {
        headers: getAuthHeader()
    });
    return userProgress.data;
};

export const updateUserProgress=async(upd)=>{
    const progress=await axios.post(`${API_URL}/updateUserProgress`, upd, {
        headers: getAuthHeader()
    });
    return progress.data;
}

