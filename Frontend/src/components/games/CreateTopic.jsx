import { useState, useEffect } from "react";
import axios from "axios";

const CreateTopic = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
  });

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ FETCH TOPICS
  const fetchTopics = async () => {
    try {
      const res = await axios.get("http://localhost:2424/api/topics");
      setTopics(res.data.topics || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE TOPIC
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.title) {
      alert("Name and Title are required");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:2424/api/topics",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setForm({
        name: "",
        title: "",
        description: "",
      });

      fetchTopics();

    } catch (err) {
      alert(err.response?.data?.message || "Error creating topic");
    }

    setLoading(false);
  };

  // ✅ DELETE TOPIC
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this topic?")) return;

    try {
      await axios.delete(
        `http://localhost:2424/api/topics/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchTopics();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Topic</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          type="text"
          name="name"
          placeholder="Internal Name (e.g. sorting)"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="title"
          placeholder="Display Title (e.g. Sorting Algorithms)"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create Topic"}
        </button>
      </form>

      {/* LIST */}
      <div className="mt-6">
        <h3 className="font-medium mb-2">Existing Topics</h3>

        {topics.length === 0 ? (
          <p className="text-gray-500">No topics yet</p>
        ) : (
          <div className="space-y-2">
            {topics.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-gray-500">{t.name}</p>
                </div>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTopic;