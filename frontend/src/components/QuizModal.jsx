import { useState } from "react";
import API from "../services/api";
import quizImg from "../assets/quiz.png";
import { FaTimes, FaQuestionCircle } from "react-icons/fa";

function QuizModal({ isOpen, onClose, documentId }) {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const generateQuiz = async () => {
    try {
      setLoading(true);

      const res = await API.post("/quiz", {
        documentId,
      });

      setQuiz(res.data);

      setCurrentQuestion(0);
      setSelectedAnswer("");
      setShowResult(false);
      setScore(0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const question = quiz[currentQuestion];

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === question.answer) {
      setScore((prev) => prev + 1);
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer("");
    setShowResult(false);

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[1100px] h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex">
        
        {/* LEFT PANEL */}
        <div className="w-[35%] bg-gradient-to-br from-blue-500 to-indigo-700 text-white p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <FaQuestionCircle className="text-3xl" />
            <h2 className="text-3xl font-bold">AI Quiz</h2>
          </div>

          <p className="text-white/80 mb-8">
            Test your knowledge with interactive MCQs.
          </p>

          <div className="bg-white/10 rounded-2xl p-5 mb-6">
            <p className="text-sm text-white/80">
              Score
            </p>

            <h3 className="text-4xl font-bold">
              {score}
            </h3>
          </div>

          <img
            src={quizImg}
            alt="quiz"
            className="w-full mt-auto"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Quiz Generator
            </h2>

            <button
              onClick={onClose}
              className="text-2xl text-slate-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>

          <button
            onClick={generateQuiz}
            className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            mb-6
            w-fit
            "
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>

          <div className="flex-1 overflow-y-auto bg-slate-50 rounded-2xl p-6 border">

            {!loading && quiz.length === 0 && (
              <div className="text-center mt-20 text-slate-400">
                Click Generate Quiz to start
              </div>
            )}

            {loading && (
              <div className="text-center mt-20">
                <div className="animate-pulse text-blue-500 text-lg">
                  AI is creating questions...
                </div>
              </div>
            )}

            {quiz.length > 0 && (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    Question {currentQuestion + 1} / {quiz.length}
                  </h3>

                  <div className="text-blue-600 font-semibold">
                    Score: {score}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border shadow-sm">

                  <h2 className="text-xl font-bold mb-6">
                    {question.question}
                  </h2>

                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <label
                        key={index}
                        className="
                        flex
                        items-center
                        gap-3
                        p-4
                        rounded-xl
                        border
                        cursor-pointer
                        hover:bg-slate-50
                        "
                      >
                        <input
                          type="radio"
                          name="quiz"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={(e) =>
                            setSelectedAnswer(e.target.value)
                          }
                        />

                        {option}
                      </label>
                    ))}
                  </div>

                  {!showResult && (
                    <button
                      onClick={checkAnswer}
                      disabled={!selectedAnswer}
                      className="
                      mt-6
                      bg-blue-500
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      disabled:opacity-50
                      "
                    >
                      Check Answer
                    </button>
                  )}

                  {showResult && (
                    <div className="mt-6">

                      <div
                        className={`p-4 rounded-xl font-semibold ${
                          selectedAnswer === question.answer
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {selectedAnswer === question.answer
                          ? "✅ Correct!"
                          : "❌ Wrong!"}
                      </div>

                      <div className="mt-4 p-4 rounded-xl bg-slate-100">
                        <p className="font-semibold mb-2">
                          Correct Answer:
                        </p>

                        <p>{question.answer}</p>

                        <p className="mt-3 text-slate-600">
                          {question.explanation}
                        </p>
                      </div>

                      {currentQuestion < quiz.length - 1 ? (
                        <button
                          onClick={nextQuestion}
                          className="
                          mt-4
                          bg-indigo-500
                          text-white
                          px-6
                          py-3
                          rounded-xl
                          "
                        >
                          Next Question →
                        </button>
                      ) : (
                        <div className="mt-6 p-5 rounded-2xl bg-green-50 border">
                          <h3 className="font-bold text-xl">
                            Quiz Completed 🎉
                          </h3>

                          <p className="mt-2">
                            Final Score: {score} / {quiz.length}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizModal;