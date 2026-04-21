import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import TopicSelector from "../components/Admin/TopicSelector";
import QuestionForm from "../components/Admin/QuestionForm";
import QuestionList from "../components/Admin/QuestionList";
import sampleQuestions from "../data/sampleQuestions";
import { useTheme } from "../context/ThemeContext";

const AdminPanel = () => {
  const { topic: routeTopic } = useParams();
  const { colour } = useTheme(); // 🎨 theme

  const [topic, setTopic] = useState(routeTopic || "sorting");
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (routeTopic) setTopic(routeTopic);
  }, [routeTopic]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:2424/api/questions/${topic}`
      );
      setQuestions(res.data.questions || []);

      if (!res.data.questions || res.data.questions.length === 0) {
        await addSampleQuestionsForTopic(topic);
        const updatedRes = await axios.get(
          `http://localhost:2424/api/questions/${topic}`
        );
        setQuestions(updatedRes.data.questions || []);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    }
    setLoading(false);
  };

  const addSampleQuestionsForTopic = async (topicName) => {
    const topicQuestions = sampleQuestions.filter(q => q.topic === topicName);

    if (topicQuestions.length === 0) return;

    try {
      for (const question of topicQuestions) {
        await axios.post(
          `http://localhost:2424/api/questions`,
          question,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchQuestions();
    } catch (error) {
      console.error("Error adding sample questions:", error);
    }
  };

  const handleAddSampleQuestions = () => {
    addSampleQuestionsForTopic(topic);
  };

  useEffect(() => {
    fetchQuestions();
  }, [topic]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(
        `http://localhost:2424/api/questions/${editingId}`,
        { ...form, topic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        `http://localhost:2424/api/questions`,
        { ...form, topic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setForm({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });

    setEditingId(null);
    fetchQuestions();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:2424/api/questions/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchQuestions();
  };

  const handleEdit = (q) => {
    setForm({
      question: q.question,
      options: q.options,
      answer: q.answer,
    });
    setEditingId(q._id);
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colour}15, #ffffff)`
      }}
      className="min-h-screen p-6"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Admin Panel - {topic.toUpperCase()}
        </h1>

        <button
          onClick={handleAddSampleQuestions}
          className="bg-green-500 text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
        >
          Add Sample Questions
        </button>
      </div>

      {/* TOPIC SELECTOR */}
      <div className="mb-6">
        <TopicSelector topic={topic} setTopic={setTopic} />
      </div>

      {/* FORM SECTION */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-6 border">
        <QuestionForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          editingId={editingId}
        />
      </div>

      {/* QUESTIONS LIST */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow border">
        <h2 className="text-lg font-semibold mb-4">
          Questions ({questions.length})
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <QuestionList
            questions={questions}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
