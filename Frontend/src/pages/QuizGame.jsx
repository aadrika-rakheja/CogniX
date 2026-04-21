import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext"; // ✅ added

function QuizGame() {
    const { topic } = useParams();
    const navigate = useNavigate();
    const { colour } = useTheme(); // ✅ mood color

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setIndex(0);
        setScore(0);
        setSelected(null);
        setAnswered(false);
        setFinished(false);
        setQuestions([]);
        setLoading(true);
    }, [topic]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!topic) {
            navigate("/games");
            return;
        }

        if (!token) {
            navigate("/");
            return;
        }

        const fetchQuestions = async () => {
            try {
                const res = await axios.get(
                    `https://cognix-v9mv.onrender.com/api/questions/${topic}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setQuestions(res.data?.questions || []);
            } catch (err) {
                console.error("Error fetching questions:", err);
                setQuestions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [topic, navigate]);

    const saveProgress = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "https://cognix-v9mv.onrender.com/api/progress",
                {
                    topic,
                    score,
                    totalQuestions: questions.length,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (err) {
            console.error("Progress save error:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-lg font-medium">Loading...</h2>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="text-center mt-10">
                <h2>No Questions Found for "{topic}"</h2>
                <button
                    onClick={() => navigate("/games")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const q = questions[index];

    if (!q) {
        return (
            <div className="text-center mt-10">
                <h2>Something went wrong</h2>
                <button
                    onClick={() => navigate("/games")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const isLast = index === questions.length - 1;

    const checkAnswer = (opt) => {
        if (answered) return;

        setSelected(opt);
        setAnswered(true);

        if (opt === q.answer) {
            setScore((prev) => prev + 1);
        }
    };

    const next = async () => {
        if (isLast) {
            await saveProgress();
            setFinished(true);
        } else {
            setIndex((prev) => prev + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    if (finished) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                    <h1 className="text-3xl font-bold mb-4">
                        Quiz Finished 🎉
                    </h1>

                    <p className="text-lg mb-4">
                        Score: {score}/{questions.length}
                    </p>

                    <button
                        onClick={() => navigate("/games")}
                        style={{ backgroundColor: colour }}
                        className="text-white px-6 py-2 rounded-lg shadow"
                    >
                        Go to Games
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                background: `linear-gradient(135deg, ${colour}15, #ffffff)`
            }}
            className="min-h-screen flex items-center justify-center p-6"
        >
            <div className="w-full max-w-2xl">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold capitalize">
                        {topic} Quiz
                    </h1>
                    <p className="text-gray-500">
                        Question {index + 1} / {questions.length}
                    </p>
                </div>

                {/* Progress */}
                <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                    <div
                        style={{
                            width: `${((index + 1) / questions.length) * 100}%`,
                            backgroundColor: colour
                        }}
                        className="h-2 rounded-full transition-all duration-500"
                    />
                </div>

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border">

                    <h2 className="text-lg font-semibold mb-4">
                        {q.question}
                    </h2>

                    <div className="space-y-3">
                        {q.options.map((opt, i) => {
                            let style =
                                "border-gray-300 hover:scale-[1.02]";

                            if (answered) {
                                if (opt === q.answer)
                                    style =
                                        "bg-green-500 text-white border-green-500";
                                else if (opt === selected)
                                    style =
                                        "bg-red-500 text-white border-red-500";
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => checkAnswer(opt)}
                                    disabled={answered}
                                    className={`w-full p-3 rounded-xl border transition-all duration-200 ${style}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {answered && (
                        <button
                            onClick={next}
                            style={{ backgroundColor: colour }}
                            className="mt-6 w-full py-3 rounded-xl text-white font-medium shadow hover:opacity-90"
                        >
                            {isLast ? "Finish" : "Next"}
                        </button>
                    )}
                </div>

                <p className="text-center mt-4 text-gray-600">
                    Score: {score}/{questions.length}
                </p>
            </div>
        </div>
    );
}

export default QuizGame;