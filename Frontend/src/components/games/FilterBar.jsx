function FilterBar({ filter, setFilter }) {
    const buttons = ["All", "Easy", "Medium", "Hard"];

    return (
        <div className="flex flex-wrap gap-2">
            {buttons.map((level) => {
                const active = filter === level;

                return (
                    <button
                        key={level}
                        onClick={() => setFilter(level)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 
                        ${
                            active
                                ? "bg-indigo-500 text-white shadow-sm scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                        }`}
                    >
                        {level}
                    </button>
                );
            })}
        </div>
    );
}

export default FilterBar;