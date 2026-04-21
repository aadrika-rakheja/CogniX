import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "./GameCard";
import FilterBar from "./FilterBar";
import StatCard from "./StatCard";
import { useTheme } from "../../context/ThemeContext"; // ✅ added

function GamesDashboard() {
  const [games] = useState([
    { _id: "1", title: "Sorting", difficulty: "Medium", topic: "sorting" },
    { _id: "2", title: "Tree", difficulty: "Hard", topic: "tree" },
    { _id: "3", title: "Memory", difficulty: "Easy", topic: "memory" },
  ]);

  const [filter, setFilter] = useState("All");
  const [stats, setStats] = useState(null);

  const { colour } = useTheme(); // ✅ added

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://cognix-v9mv.onrender.com/api/progress", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data?.data || [];

      const gamesPlayed = data.length;
      const highScore = data.reduce((m, i) => Math.max(m, i.score || 0), 0);

      const totalCorrect = data.reduce((s, i) => s + (i.score || 0), 0);
      const totalQ = data.reduce((s, i) => s + (i.totalQuestions || 0), 0);

      const accuracy = totalQ
        ? Math.round((totalCorrect / totalQ) * 100)
        : 0;

      setStats({ gamesPlayed, highScore, accuracy });
    } catch (err) {
      console.log(err.message);
    }
  };

  const filtered =
    filter === "All" ? games : games.filter((g) => g.difficulty === filter);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colour}20, ${colour}08, #ffffff)`
      }}
      className="min-h-screen p-6 md:p-10 transition-all duration-500 ease-in-out"
    >

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
          🎮 Learning Games
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Make learning fun with interactive concept-based games
        </p>
      </div>

      {/* Stats */}
{stats && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
    
    <div
      style={{
        background: `linear-gradient(135deg, ${colour}20, #ffffff)`,
        borderColor: `${colour}30`
      }}
      className="backdrop-blur-xl border shadow-md rounded-xl p-5 hover:shadow-lg transition"
    >
      <StatCard title="Games Played" value={stats.gamesPlayed} />
    </div>

    <div
      style={{
        background: `linear-gradient(135deg, ${colour}20, #ffffff)`,
        borderColor: `${colour}30`
      }}
      className="backdrop-blur-xl border shadow-md rounded-xl p-5 hover:shadow-lg transition"
    >
      <StatCard title="High Score" value={stats.highScore} />
    </div>

    <div
      style={{
        background: `linear-gradient(135deg, ${colour}20, #ffffff)`,
        borderColor: `${colour}30`
      }}
      className="backdrop-blur-xl border shadow-md rounded-xl p-5 hover:shadow-lg transition"
    >
      <StatCard title="Accuracy" value={`${stats.accuracy}%`} />
    </div>

    <div
      style={{
        background: `linear-gradient(135deg, ${colour}20, #ffffff)`,
        borderColor: `${colour}30`
      }}
      className="backdrop-blur-xl border shadow-md rounded-xl p-5 hover:shadow-lg transition"
    >
      <StatCard title="Stars Earned" value="67" />
    </div>

  </div>
)}

      {/* Filter */}
<div className="flex justify-between items-center mb-6">
  <h2 className="text-lg font-semibold text-gray-800">
    Available Games
  </h2>

  <div className="flex items-center">
    <FilterBar filter={filter} setFilter={setFilter} />
  </div>
</div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {filtered.map((game) => (
          <div
            key={game._id}
            className="group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default GamesDashboard;