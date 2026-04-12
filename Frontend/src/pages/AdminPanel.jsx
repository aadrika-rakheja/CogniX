import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import TopicSelector from "../components/Admin/TopicSelector";
import QuestionForm from "../components/admin/QuestionForm";
import QuestionList from "../components/Admin/QuestionList";

const AdminPanel = () => {
  const { topic: routeTopic } = useParams();

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
    const res = await axios.get(
      `http://localhost:8000/api/questions/${topic}`
    );
    setQuestions(res.data.questions);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, [topic]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(
        `http://localhost:8000/api/questions/${editingId}`,
        { ...form, topic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        `http://localhost:8000/api/questions`,
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
      `http://localhost:8000/api/questions/${id}`,
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Panel - {topic.toUpperCase()}
      </h1>

      <TopicSelector topic={topic} setTopic={setTopic} />

      <QuestionForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <QuestionList
          questions={questions}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminPanel;