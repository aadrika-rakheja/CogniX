import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { createSubj } from '../services/subjService';

export default function CreateSubj() {
  const { mood, colour } = useTheme();
  const [subj, setSubj] = useState({
    symbol: "",
    subjName: "",
    desc: ""
  });

  const handleChange = (e) => {
    setSubj({ ...subj, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createSubj(subj);
    setSubj({
      symbol: "",
      subjName: "",
      desc: ""
    })
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Create Subject</h2>
        <span className="text-sm text-slate-500">Mood: {mood}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-slate-600" htmlFor="symbol">Symbol</label>
          <input
            id="symbol"
            type="text"
            name="symbol"
            value={subj.symbol}
            onChange={handleChange}
            placeholder="E.g. 🌐"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-600" htmlFor="subjName">Subject Name</label>
          <input
            id="subjName"
            type="text"
            name="subjName"
            value={subj.subjName}
            onChange={handleChange}
            placeholder="E.g. Web Development"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-600" htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            value={subj.desc}
            onChange={handleChange}
            placeholder="Write a short description about this subject"
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: colour }}
          className="w-full rounded-lg px-4 py-2 text-white font-semibold transition hover:opacity-90"
        >
          Create Subject
        </button>
      </form>
    </section>
  )
}
