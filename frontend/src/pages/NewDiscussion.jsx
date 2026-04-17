import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { createDiscussion } from "../services/discussionServices";

const AVAILABLE_TAGS = [
  "Algorithms",
  "Web Development",
  "Database",
  "Machine Learning",
];

function NewDiscussion({ refreshDiscussions }) {
  const navigate = useNavigate();

  // State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Add tag
  const handleTagSelect = (e) => {
    const value = e.target.value;

    if (value && !selectedTags.includes(value)) {
      setSelectedTags([...selectedTags, value]);
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
      tags: selectedTags,
      author: "You", // temporary
      repliesCount: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      await createDiscussion(newPost);
      await refreshDiscussions();
      navigate("/");
    } catch (error) {
      console.error("Create failed:", error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow border border-gray-200">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">
        Start a New Discussion
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          placeholder="Enter discussion title..."
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Describe your question..."
          className="w-full border px-4 py-2 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Tag Selector */}
        <div>

          <select
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={handleTagSelect}
            value=""
          >
            <option value="">Select tags</option>

            {AVAILABLE_TAGS.map((tag, index) => (
              <option
                key={index}
                value={tag}
                disabled={selectedTags.includes(tag)}
              >
                {tag}
              </option>
            ))}
          </select>

          {/* Selected Tags */}
          <div className="flex flex-wrap gap-2 mt-3">

            {selectedTags.map((tag, index) => (
              <div
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              >
                {tag}

                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}

          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
        >
          Post Discussion
        </button>

      </form>

    </div>
  );
}

export default NewDiscussion;