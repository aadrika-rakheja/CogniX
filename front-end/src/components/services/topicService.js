import  axios  from "axios";


const API_URL="http://localhost:2424/topics";

export const getTopicsSubjwise=async(id)=>{
    const res=await axios.get(`${API_URL}/${id}`);
    return  res.data;
}

export const createTopic=async(topic)=>{
    const res=await axios.post(`${API_URL}/createTopic`,topic);
    return res.data;
}

export const getTopics=async()=>{
    const res=await axios.get(`${API_URL}/getTopics`);
    return res.data;
}

export const getTopicById=async(id,tid)=>{
    const res=await axios.get(`${API_URL}/${id}/video/${tid}`);
    return res.data[0];
}