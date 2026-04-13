import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Play, BookOpen } from "lucide-react";

function TopicCard({ topic }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { color } = useTheme();

    // 🎮 PLAY QUIZ
    const handlePlayQuiz = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:2424/api/questions/${topic.name}`
            );

            const data = await response.json();

            if (!data.success || !data.questions || data.questions.length === 0) {
                throw new Error("No questions available for this topic.");
            }

            // Navigate to quiz with questions and topic info
            navigate("/quiz", {
                state: {
                    questions: data.questions,
                    title: topic.title,
                    topic: topic.name,
                },
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
            {/* HEADER */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {topic.title}
                    </h3>
                    {topic.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {topic.description}
                        </p>
                    )}
                </div>
                <div className="ml-3">
                    <BookOpen className="w-8 h-8 text-indigo-500" />
                </div>
            </div>

            {/* STATS */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Topic: {topic.name}</span>
            </div>

            {/* ERROR */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-3">
                <button
                    onClick={handlePlayQuiz}
                    disabled={isLoading}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            Start Quiz
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default TopicCard;