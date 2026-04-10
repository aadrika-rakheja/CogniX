import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { getAllSubjects } from '../services/subjService';
import { createTopic } from '../services/topicService';

function CreateTopic() {
  const { mood, colour } = useTheme();
  const [topic, setTopic] = useState({
    symbolTopic: "",
    title: "",
    subjName: "",
    desc: "",
    level: "",
    order: "",
    content: {
      link: "",
      duration: ""
    }
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    const res = await getAllSubjects();
    setData(res);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("content.")) {
      const key = name.split(".")[1];
      setTopic({
        ...topic,
        content: {
          ...topic.content,
          [key]: value
        }
      });
    } else {
      setTopic({
        ...topic,
        [name]: value
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createTopic(topic);
    setTopic({
      symbolTopic: "",
      title: "",
      subjName: "",
      desc: "",
      level: "",
      order: "",
      content: {
        link: "",
        duration: ""
      }
    });
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Create Topic</h2>
        <span className="text-sm text-slate-500">Mood: {mood}</span>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="symbolTopic" className="block text-sm font-medium text-slate-600 mb-1">Symbol</label>
            <input
              id="symbolTopic"
              type="text"
              name="symbolTopic"
              value={topic.symbolTopic}
              onChange={handleChange}
              placeholder="Topic Symbol (e.g. 📶)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-600 mb-1">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={topic.title}
              onChange={handleChange}
              placeholder="Topic title"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subjName" className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
          <select
            id="subjName"
            name="subjName"
            value={topic.subjName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Select Subject</option>
            {data.map((subj) => (
              <option key={subj._id} value={subj._id}>{subj.subjName}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-slate-600 mb-1">Description</label>
          <textarea
            id="desc"
            name="desc"
            value={topic.desc}
            onChange={handleChange}
            rows={3}
            placeholder="Brief topic description"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-slate-600 mb-1">Level</label>
            <select
              id="level"
              name="level"
              value={topic.level}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium text-slate-600 mb-1">Order</label>
            <input
              id="order"
              type="number"
              name="order"
              value={topic.order}
              onChange={handleChange}
              placeholder="Display order"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="contentDuration" className="block text-sm font-medium text-slate-600 mb-1">Duration (mins)</label>
            <input
              id="contentDuration"
              type="number"
              name="content.duration"
              value={topic.content.duration}
              onChange={handleChange}
              placeholder="e.g. 45"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contentLink" className="block text-sm font-medium text-slate-600 mb-1">Content Link</label>
          <input
            id="contentLink"
            type="text"
            name="content.link"
            value={topic.content.link}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: colour }}
          className="mt-2 w-full rounded-lg px-4 py-2 text-white font-semibold transition hover:opacity-90"
        >
          Create Topic
        </button>
      </form>
    </section>
  )
}

export default CreateTopic
