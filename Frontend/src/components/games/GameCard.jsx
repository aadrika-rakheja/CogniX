import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Play, Settings } from "lucide-react";

function GameCard({ game }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { colour } = useTheme(); // ✅ keep same

    // 🔐 SAFE USER PARSE (no crash)
    let user = null;
    try {
        const token = localStorage.getItem("token");
        user = token ? JSON.parse(atob(token.split(".")[1])) : null;
    } catch {
        user = null;
    }

    // 🎯 GET TOPIC (NO CHANGE)
    const getTopic = () => {
        const title = game?.title || "";
        let topic = title.toLowerCase();

        if (topic.includes("sorting")) return "sorting";
        if (topic.includes("tree")) return "tree";
        if (topic.includes("memory")) return "memory";

        return null;
    };

    const topic = getTopic();

    // 🎮 PLAY GAME (NO LOGIC CHANGE)
    const handlePlayGame = async () => {
        setIsLoading(true);
        setError(null);

        if (!topic) {
            setError("Unable to start game: missing topic.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `https://cognix-v9mv.onrender.com/api/questions/${topic}`
            );

            const data = await response.json();

            if (!data.success || !data.questions || data.questions.length === 0) {
                throw new Error("No questions available for this game.");
            }

          navigate(`/quiz/${topic}`, {
    state: {
        questions: data.questions,
        game: game,
        title: game.title,
    },
});

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // 🔧 ADMIN NAVIGATION (NO CHANGE)
    const handleAdmin = () => {
        if (!topic) return;
        navigate(`/admin/${topic}`);
    };

    // 🎯 Difficulty badge (NO CHANGE)
    const getDifficultyColor = (difficulty) => {
        if (difficulty === "Easy") return "bg-green-100 text-green-600";
        if (difficulty === "Medium") return "bg-yellow-100 text-yellow-600";
        if (difficulty === "Hard") return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600";
    };

    // 🎨 Illustration (NO CHANGE)
    const renderIllustration = (title) => {
        const t = title?.toLowerCase();

        if (t.includes("sorting")) {
            return (
                <div className="flex items-end gap-1 h-full">
                    <div className="w-2 bg-indigo-400 rounded-sm h-6"></div>
                    <div className="w-2 bg-indigo-500 rounded-sm h-10"></div>
                    <div className="w-2 bg-indigo-600 rounded-sm h-14"></div>
                    <div className="w-2 bg-indigo-400 rounded-sm h-8"></div>
                    <div className="w-2 bg-indigo-500 rounded-sm h-12"></div>
                </div>
            );
        }

        if (t.includes("tree")) {
            return (
                <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex gap-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                </div>
            );
        }

        if (t.includes("memory")) {
            return (
                <div className="flex gap-2">
                    <div className="w-6 h-8 bg-purple-400 rounded-md"></div>
                    <div className="w-6 h-8 bg-purple-500 rounded-md"></div>
                    <div className="w-6 h-8 bg-purple-300 rounded-md"></div>
                </div>
            );
        }

        return <div className="w-10 h-10 bg-indigo-200 rounded-lg"></div>;
    };

    return (
        <div
            style={{
                background: `linear-gradient(135deg, ${colour}12, #ffffff)`,
                borderColor: `${colour}30`
            }}
            className="group rounded-2xl border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >

            {/* Illustration */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${colour}25, ${colour}08)`
                }}
                className="h-28 w-full rounded-xl flex items-center justify-center mb-4"
            >
                {renderIllustration(game?.title)}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900">
                {game?.title || "Game Title"}
            </h3>

            {/* Description */}
            <p className="mt-1 text-sm text-gray-500">
                {game?.description || "Test your skills with this interactive learning game."}
            </p>

            {/* Badge */}
            <div className="mt-3 flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-md font-medium ${getDifficultyColor(game?.difficulty)}`}>
                    {game?.difficulty || "Easy"}
                </span>

                <span className="text-xs text-gray-400">
                    5–10 min
                </span>
            </div>

            {/* PLAY BUTTON */}
            <button
                onClick={handlePlayGame}
                disabled={isLoading}
                style={{ backgroundColor: colour }}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg text-white py-2 text-sm font-medium transition hover:opacity-90"
            >
                <Play size={16} />
                {isLoading ? "Loading..." : "Play"}
            </button>

            {/* ADMIN */}
            {user?.role === "admin" && (
                <button
                    onClick={handleAdmin}
                    style={{
                        borderColor: colour,
                        color: colour
                    }}
                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium hover:bg-gray-50 transition"
                >
                    <Settings size={16} />
                    Manage Questions
                </button>
            )}

            {/* ERROR */}
            {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p>
            )}
        </div>
    );
}

export default GameCard;