import axios from "axios";

const API_URL="http://localhost:2424/Subjects";

export const getAllSubjects= async()=>{
    const response=await axios.get(`${API_URL}/getAllSubjects`);
    return response.data;
}

export const createSubj=async(subj)=>{
    const res=await axios.post(`${API_URL}/createSubject`,subj);
    return res.data;
}

export const getSubjectByID=async(id)=>{
    const response=await axios.get(`${API_URL}/${id}`);
    return response.data;
}

export const deleteSubj=async(id)=>{
    const response=await axios.delete(`${API_URL}/${id}`);
    return response.data;
}