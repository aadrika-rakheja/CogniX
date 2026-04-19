import { useTheme } from "../../context/ThemeContext";

function FilterBar({ filter, setFilter }) {
  const filters = ["All", "Easy", "Medium", "Hard"];
  const { colour } = useTheme();

  return (
    <div className="flex flex-wrap gap-4 mb-4">

      {filters.map((f) => {
        const isActive = filter === f;

        return (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={
              isActive
                ? {
                    backgroundColor: colour,
                    boxShadow: `0 4px 14px ${colour}40`
                  }
                : {}
            }
            className={`
              px-4 py-2 text-sm font-semibold rounded-full
              transition-all duration-300 ease-in-out

              ${isActive
                ? "text-white scale-105"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/60"
              }
            `}
          >
            {f}
          </button>
        );
      })}

    </div>
  );
}

export default FilterBar;