import { useNavigate } from "react-router-dom";

function GameCard({ game }) {
    const navigate = useNavigate();

    return (
        <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{game.title}</h2>

            <p className="text-gray-600 mb-4">
                {game.description}
            </p>

            {/* ✅ FIX IS HERE */}
            <button
                onClick={() => navigate(`/quiz/${game.topic}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                Play
            </button>
        </div>
    );
}

export default GameCard;