const TopicSelector = ({ topic, setTopic }) => {
  const topics = ["sorting", "tree", "memory"];

  return (
    <div className="mb-4">
      <label className="font-medium mr-2">Select Topic:</label>
      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        {topics.map((t) => (
          <option key={t} value={t}>
            {t.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TopicSelector;