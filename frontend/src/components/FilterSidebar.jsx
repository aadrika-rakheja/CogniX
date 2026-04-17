const TAGS = [
  "All",
  "Algorithms",
  "Web Development",
  "Database",
  "Machine Learning",
];

function FilterSidebar({ selectedTag, setSelectedTag }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">

      <h2 className="font-semibold text-lg mb-4">
        Filter by Subject
      </h2>

      <div className="space-y-2">

        {TAGS.map((tag, index) => (
          <button
            key={index}
            onClick={() => setSelectedTag(tag)}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${
              selectedTag === tag
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {tag}
          </button>
        ))}

      </div>

    </div>
  );
}

export default FilterSidebar;