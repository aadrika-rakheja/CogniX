const TopicList = ({ topics, handleEdit, handleDelete }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Topics</h2>

      {topics.length === 0 ? (
        <p>No topics found</p>
      ) : (
        topics.map((t) => (
          <div
            key={t._id}
            className="border p-3 mb-2 rounded bg-gray-50"
          >
            <p className="font-medium">{t.title}</p>
            <p className="text-sm text-gray-600">Name: {t.name}</p>
            {t.description && (
              <p className="text-sm text-gray-600">Description: {t.description}</p>
            )}

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(t)}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(t._id)}
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

export default TopicList;