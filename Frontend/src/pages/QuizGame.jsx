import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

function QuizGame() {
    const location = useLocation();
    const navigate = useNavigate();
    const { colour } = useTheme();

    const { questions = [], game = {}, title = "" } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // ✅ Corrected saveProgress function
    const saveProgress = async () => {
        const token = localStorage.getItem("token");
        console.log("TOKEN:",token);
        if (!token) {
            console.error("No token found. Please log in.");
            console.log("Token used:",token);
            return;
        }

        try {
            // Correct endpoint: /api/progress (not /save-process)
            await axios.post(
                "http://localhost:8000/api/progress",
                {
                    topic: title || game.title,
                    score: score,
                    totalQuestions: questions.length,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Progress Saved Successfully");
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };

    if (!questions || questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h2 className="text-xl font-bold mb-3">No Questions Available</h2>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-indigo-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    const isAnswerCorrect = (opt, ans) => {
        return opt?.trim().toLowerCase() === ans?.trim().toLowerCase();
    };

    const handleAnswerClick = (option) => {
        if (answered) return;

        setSelectedAnswer(option);
        setAnswered(true);

        if (isAnswerCorrect(option, currentQuestion.answer)) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNext = async () => {
        if (isLastQuestion) {
            await saveProgress(); // save progress on finish
            navigate("/dashboard", {
                state: {
                    quizCompleted: true,
                    finalScore: score,
                    totalQuestions: questions.length,
                },
            });
        } else {
            setCurrentIndex((prev) => prev + 1);
            setAnswered(false);
            setSelectedAnswer(null);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setAnswered(false);
            setSelectedAnswer(null);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">{title || game.title}</h1>
                    <p className="font-semibold">
                        Score: {score}/{questions.length}
                    </p>
                </div>

                {/* Question */}
                <div className="bg-white p-6 rounded-lg shadow mb-4">
                    <h2 className="text-lg font-semibold mb-3">
                        Q{currentIndex + 1}. {currentQuestion.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrect = isAnswerCorrect(option, currentQuestion.answer);

                            const showCorrect = answered && isCorrect;
                            const showIncorrect = answered && isSelected && !isCorrect;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={answered}
                                    className={`w-full text-left p-3 rounded border transition
                                        ${
                                            showCorrect
                                                ? "bg-green-200 border-green-600"
                                                : showIncorrect
                                                ? "bg-red-200 border-red-600"
                                                : isSelected
                                                ? "bg-blue-200 border-blue-600"
                                                : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                                        }
                                    `}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback */}
                    {answered && (
                        <div className="mt-4 p-3 rounded bg-gray-100">
                            {isAnswerCorrect(selectedAnswer, currentQuestion.answer) ? (
                                <p className="text-green-700 font-semibold">✅ Correct!</p>
                            ) : (
                                <p className="text-red-700 font-semibold">
                                    ❌ Incorrect <br />
                                    Correct Answer: <strong>{currentQuestion.answer}</strong>
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Prev
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!answered}
                        style={{ backgroundColor: colour }}
                        className="text-white px-4 py-2 rounded transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLastQuestion ? "Finish" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizGame;