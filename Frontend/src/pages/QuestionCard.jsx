const QuestionCard = ({ q, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

      <div>
        <p className="font-medium">{q.question}</p>
        <p className="text-sm text-gray-500">Answer: {q.answer}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(q)}
          className="bg-yellow-400 px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(q._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default QuestionCard;