import { useState } from "react";
import API from "../services/api";

function ChatModal({ isOpen, onClose, documentId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const askQuestion = async () => {
    try {
      setLoading(true);

      const res = await API.post("/chat", {
        documentId,
        question,
      });

      setAnswer(res.data.answer);
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
            AI Chat
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <textarea
          placeholder="Ask anything about the PDF..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border rounded-xl p-4 mb-4 h-32"
        />

        <button
          onClick={askQuestion}
          className="bg-cyan-500 text-white px-6 py-3 rounded-xl mb-6"
        >
          Ask AI
        </button>

        {loading && (
          <p>Thinking...</p>
        )}

        {answer && (
          <div className="bg-slate-50 p-5 rounded-2xl whitespace-pre-wrap">
            {answer}
          </div>
        )}

      </div>
    </div>
  );
}

export default ChatModal;