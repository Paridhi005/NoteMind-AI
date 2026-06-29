import { useState } from "react";
import API from "../services/api";
import chatImg from "../assets/chat.png";
import { FaTimes, FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";

function ChatModal({ isOpen, onClose, documentId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const res = await API.post("/chat", {
        documentId,
        question: userQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: res.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[1150px] h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex">

        {/* LEFT PANEL */}
        <div className="w-[35%] bg-gradient-to-br from-cyan-500 to-blue-700 text-white p-8 flex flex-col">

          <div className="flex items-center gap-3 mb-6">
            <FaRobot className="text-3xl" />
            <h2 className="text-3xl font-bold">
              AI Chat
            </h2>
          </div>

          <p className="text-white/80 mb-8">
            Ask questions directly from your uploaded notes and PDFs.
          </p>

          <img
            src={chatImg}
            alt="chat"
            className="w-full mt-auto"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col">

          {/* HEADER */}
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Study Assistant
            </h2>

            <button
              onClick={onClose}
              className="text-2xl text-slate-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">

            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-400 text-lg">
                Ask anything about your PDF...
              </div>
            )}

            <div className="space-y-5">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[75%]
                      rounded-2xl
                      px-5
                      py-4
                      shadow-sm
                      ${
                        msg.type === "user"
                          ? "bg-cyan-500 text-white"
                          : "bg-white border text-slate-700"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {msg.type === "user" ? (
                        <FaUser />
                      ) : (
                        <FaRobot />
                      )}

                      <span className="font-semibold">
                        {msg.type === "user"
                          ? "You"
                          : "NoteMind AI"}
                      </span>
                    </div>

                    <div className="whitespace-pre-wrap">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-2xl px-5 py-4">
                    <div className="animate-pulse text-cyan-500">
                      AI is thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* INPUT */}
          <div className="p-5 border-t bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask anything about the document..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askQuestion();
                  }
                }}
                className="
                  flex-1
                  border
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

              <button
                onClick={askQuestion}
                className="
                  bg-cyan-500
                  hover:bg-cyan-600
                  text-white
                  px-6
                  rounded-xl
                "
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatModal;