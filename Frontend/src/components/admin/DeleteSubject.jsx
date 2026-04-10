import { useState } from 'react'
import { deleteSubj } from '../services/subjService';
import { useTheme } from '../../context/ThemeContext';


export default function DeleteSubject({data}) {
    const { mood, colour } = useTheme();
    const [id,setId]=useState();

   
      const handleSubmit=(e)=>{
        e.preventDefault();
        deleteSubj(id);
        setId();
      }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Delete Subject</h2>
        <span className="text-sm text-slate-500">Mood: {mood}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="subjName" className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
          <select
            id="subjName"
            name="subjName"
            value={id}
            onChange={(e)=>setId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Select Subject</option>
            {data.map((subj) => (
              <option key={subj._id} value={subj._id}>{subj.subjName}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{ backgroundColor: colour }}
          className="mt-2 w-full rounded-lg px-4 py-2 text-white font-semibold transition hover:opacity-90"
        >
          Delete Subject
        </button>

      </form>
    </section>
  )
}
