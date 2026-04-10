import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { deleteTopic, getTopicsSubjwise } from "../services/topicService";

function DeleteTopic({data}) {
  const { mood, colour } = useTheme();
  const [tid,setTid]=useState("");
  const [i,setI]=useState("");
  const [topics,setTopics]=useState([]);
 

  const callTopicList=async(e)=>{
     const id=e.target.value;
     setI(id);
     console.log("Selected subject id:", id);
   setTopics(await getTopicsSubjwise(id));
    
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    deleteTopic(i,tid);
    setTid("");
    setI("");
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Delete Topic</h2>
        <span className="text-sm text-slate-500">Mood: {mood}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="subjName" className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
          <select
            id="subjName"
            name="subjName"
            onChange={callTopicList}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Select Subject</option>
            {data.map((subj) => (
              <option key={subj._id} value={subj._id}>{subj.subjName}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-600 mb-1">Topic</label>
          <select
            id="topic"
            name="topic"
            value={tid}
            onChange={(e)=>setTid(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Select Topic</option>
             {topics.map((t) => (
              <option key={t._id} value={t._id}>{t.title}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{ backgroundColor: colour }}
          className="mt-2 w-full rounded-lg px-4 py-2 text-white font-semibold transition hover:opacity-90"
        >
          Delete Topic
        </button>

      </form>
    </section>
  )
}


export default DeleteTopic
