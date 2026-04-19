import { useTheme } from "../../context/ThemeContext";

const QuestionList = ({ questions, handleEdit, handleDelete }) => {
  const { colour } = useTheme();

  return (
    <div>
      {questions.length === 0 ? (
        <p className="text-gray-500">No questions found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {questions.map((q) => (
            <div
              key={q._id}
              className="group bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-md border transition hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: `${colour}20` }}
            >
              {/* Question */}
              <p className="font-semibold text-gray-800">
                {q.question}
              </p>

              {/* Options */}
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                {q.options.map((opt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-gray-400">•</span> {opt}
                  </li>
                ))}
              </ul>

              {/* Answer */}
              <p
                className="mt-3 text-sm font-medium"
                style={{ color: colour }}
              >
                ✔ Answer: {q.answer}
              </p>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(q)}
                  className="text-sm px-3 py-1 rounded-lg border transition hover:bg-gray-100"
                  style={{ borderColor: colour, color: colour }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(q._id)}
                  className="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionList;