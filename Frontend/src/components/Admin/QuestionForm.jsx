const QuestionForm = ({ form, setForm, handleSubmit, editingId }) => {
  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Enter question"
        value={form.question}
        onChange={(e) => setForm({ ...form, question: e.target.value })}
        className="border p-2 w-full mb-2"
        required
      />

      {form.options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
      ))}

      <input
        type="text"
        placeholder="Correct Answer"
        value={form.answer}
        onChange={(e) => setForm({ ...form, answer: e.target.value })}
        className="border p-2 w-full mb-2"
        required
      />

      <button className="bg-indigo-500 text-white px-4 py-2 rounded">
        {editingId ? "Update Question" : "Add Question"}
      </button>
    </form>
  );
};

export default QuestionForm;