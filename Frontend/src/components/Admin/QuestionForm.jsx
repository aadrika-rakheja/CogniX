import { useTheme } from "../../context/ThemeContext";

const QuestionForm = ({ form, setForm, handleSubmit, editingId }) => {
  const { colour } = useTheme();

  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Question */}
      <div>
        <label className="text-sm font-medium text-gray-600">
          Question
        </label>
        <input
          type="text"
          placeholder="Enter your question..."
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="w-full mt-1 p-3 rounded-xl border bg-white/70 backdrop-blur-md focus:ring-2 focus:outline-none transition"
          style={{ borderColor: `${colour}40` }}
          required
        />
      </div>

      {/* Options */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Options
        </label>

        <div className="grid md:grid-cols-2 gap-3">
          {form.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              className="p-3 rounded-xl border bg-white/70 backdrop-blur-md focus:ring-2 focus:outline-none transition"
              style={{ borderColor: `${colour}30` }}
              required
            />
          ))}
        </div>
      </div>

      {/* Answer */}
      <div>
        <label className="text-sm font-medium text-gray-600">
          Correct Answer
        </label>
        <input
          type="text"
          placeholder="Enter correct answer..."
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          className="w-full mt-1 p-3 rounded-xl border bg-white/70 backdrop-blur-md focus:ring-2 focus:outline-none transition"
          style={{ borderColor: `${colour}40` }}
          required
        />
      </div>

      {/* Button */}
      <button
        style={{ backgroundColor: colour }}
        className="w-full py-3 rounded-xl text-white font-medium shadow-md hover:opacity-90 transition-all"
      >
        {editingId ? "Update Question ✏️" : "Add Question ➕"}
      </button>
    </form>
  );
};

export default QuestionForm;