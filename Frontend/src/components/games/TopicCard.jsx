import { useNavigate } from "react-router-dom";
import { Play, BookOpen } from "lucide-react";

function TopicCard({ topic }) {
    const navigate = useNavigate();

    const handlePlayQuiz = () => {
        if (!topic?.name) {
            alert("Topic missing");
            return;
        }

        navigate(`/quiz/${topic.name.toLowerCase()}`); // ✅ FIXED
    };

    return (
        <div className="bg-white rounded-xl border p-6 shadow">
            <div className="flex justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold">
                        {topic.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {topic.description}
                    </p>
                </div>
                <BookOpen className="w-6 h-6 text-indigo-500" />
            </div>

            <button
                onClick={handlePlayQuiz}
                className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center gap-2"
            >
                <Play size={16} />
                Start Quiz
            </button>
        </div>
    );
}

export default TopicCard;