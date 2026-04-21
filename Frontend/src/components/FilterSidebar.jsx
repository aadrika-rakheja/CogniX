import { useTheme } from "../context/ThemeContext";

const TAGS = [
  "All",
  "Algorithms",
  "Web Development",
  "Database",
  "Machine Learning",
];

function FilterSidebar({ selectedTag, setSelectedTag }) {
  const {colour}=useTheme();
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
             style={
                selectedTag === tag
                  ? { backgroundColor: colour, color: "white" }
                  : {}
              }
            className={`w-full text-left px-3 py-2 rounded-lg transition ${
              selectedTag === tag
              ?"": "hover:bg-gray-100"
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