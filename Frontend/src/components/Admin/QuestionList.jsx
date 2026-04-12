const QuestionList = ({ questions, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Questions</h2>

      {questions.length === 0 ? (
        <p>No questions found</p>
      ) : (
        questions.map((q) => (
          <div
            key={q._id}
            className="border p-3 mb-2 rounded bg-gray-50"
          >
            <p className="font-medium">{q.question}</p>

            <ul className="text-sm text-gray-600">
              {q.options.map((opt, i) => (
                <li key={i}>• {opt}</li>
              ))}
            </ul>

            <p className="text-green-600 text-sm">
              Answer: {q.answer}
            </p>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(q)}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(q._id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionList;