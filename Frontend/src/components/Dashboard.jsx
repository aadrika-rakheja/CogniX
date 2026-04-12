import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard";
import FilterBar from "../components/FilterBar";
import StatCard from "../components/StatCard";

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const { colour } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found. User must log in.");
                    setLoading(false);
                    return;
                }

                const gamesRes = await axios.get("http://localhost:8000/api/games");

                const statsRes = await axios.get("http://localhost:8000/api/progress", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const progressRecords = Array.isArray(statsRes.data)
                    ? statsRes.data
                    : Array.isArray(statsRes.data?.data)
                    ? statsRes.data.data
                    : [];

                const gamesPlayed = progressRecords.length;
                const highScore = progressRecords.reduce(
                    (max, item) => Math.max(max, item.score || 0),
                    0
                );
                const avgScore = progressRecords.length
                    ? Math.round(
                          progressRecords.reduce(
                              (sum, item) => sum + (item.score || 0),
                              0
                          ) / progressRecords.length
                      )
                    : 0;
                const totalAnswered = progressRecords.reduce(
                    (sum, item) => sum + (item.totalQuestions || 0),
                    0
                );
                const totalCorrect = progressRecords.reduce(
                    (sum, item) => sum + (item.score || 0),
                    0
                );
                const accuracy = totalAnswered
                    ? Math.round((totalCorrect / totalAnswered) * 100)
                    : 0;

                setGames(gamesRes.data);
                setStats({
                    gamesPlayed,
                    highScore,
                    avgScore,
                    accuracy,
                    streak: 0,
                });

                setTimeout(() => {
                    setLoading(false);
                }, 100);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            }
        };

        fetchData();
    }, []);

    const filteredGames =
        filter === "All"
            ? games
            : games.filter((g) => g.difficulty === filter);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 text-center">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-8">
            <section className="mx-auto max-w-7xl bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">

                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-2">
                            🎮 Learning Games
                        </h1>
                        <p className="mt-1 text-gray-500 text-sm">
                            Make learning fun with interactive concept-based games
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </header>

                {stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Games Played" value={stats.gamesPlayed} />
                        <StatCard title="High Score" value={stats.highScore} />
                        <StatCard title="Accuracy" value={`${stats.accuracy}%`} />
                        <StatCard title="Avg Score" value={`${stats.avgScore}%`} />
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Available Games
                    </h2>

                    <div className="bg-gray-100 p-1 rounded-xl flex gap-2 w-fit">
                        <FilterBar filter={filter} setFilter={setFilter} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                        <GameCard key={game._id} game={game} />
                    ))}
                </div>

                {filteredGames.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 bg-gray-50 mt-6">
                        No games found for the selected filter.
                    </div>
                )}
            </section>
        </main>
    );
};

export default Dashboard;