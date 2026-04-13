import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import TopicSelector from "../components/Admin/TopicSelector";
import QuestionForm from "../components/admin/QuestionForm";
import QuestionList from "../components/Admin/QuestionList";
import sampleQuestions from "../data/sampleQuestions";

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
    try {
      const res = await axios.get(
        `http://localhost:2424/api/questions/${topic}`
      );
      setQuestions(res.data.questions || []);

      // If no questions exist for this topic, add sample questions
      if (!res.data.questions || res.data.questions.length === 0) {
        await addSampleQuestionsForTopic(topic);
        // Fetch again after adding samples
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
      console.log(`Added ${topicQuestions.length} sample questions for ${topicName}`);
      fetchQuestions(); // Refresh the list
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Panel - {topic.toUpperCase()}
      </h1>

      <TopicSelector topic={topic} setTopic={setTopic} />

      <div className="mb-4">
        <button
          onClick={handleAddSampleQuestions}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Sample Questions
        </button>
      </div>

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