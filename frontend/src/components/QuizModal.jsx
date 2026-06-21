import { useState } from "react";
import API from "../services/api";

function QuizModal({ isOpen, onClose, documentId }) {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const generateQuiz = async () => {
    try {
      setLoading(true);

      const res = await API.post("/quiz", {
        documentId,
      });

      setQuiz(res.data.quiz);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[900px] max-h-[85vh] overflow-y-auto rounded-3xl p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            AI Quiz
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <button
          onClick={generateQuiz}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl mb-6"
        >
          Generate Quiz
        </button>

        {loading && (
          <p>Generating quiz...</p>
        )}

        {quiz && (
          <div className="whitespace-pre-wrap bg-slate-50 p-5 rounded-2xl">
            {quiz}
          </div>
        )}

      </div>
    </div>
  );
}

export default QuizModal;