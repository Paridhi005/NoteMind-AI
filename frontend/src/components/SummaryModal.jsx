import { useState } from "react";
import API from "../services/api";
import summaryImg from "../assets/summary.png";
import { FaTimes, FaBrain } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

function SummaryModal({ isOpen, onClose, documentId }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const generateSummary = async () => {
    try {
      setLoading(true);

      const res = await API.post("/summary", {
        documentId,
      });

      setSummary(res.data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[1100px] h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex">
        {/* LEFT SIDE */}
        <div className="w-[35%] bg-gradient-to-br from-sky-500 to-blue-700 text-white p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <FaBrain className="text-3xl" />
            <h2 className="text-3xl font-bold">AI Summary</h2>
          </div>

          <p className="text-white/80 mb-8">
            Generate exam-friendly notes instantly.
          </p>

          <img src={summaryImg} alt="summary" className="w-full mt-auto" />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Smart Notes</h2>

            <button
              onClick={onClose}
              className="text-2xl text-slate-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>

          <button
            onClick={generateSummary}
            className="
              bg-sky-500
              hover:bg-sky-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              mb-6
              w-fit
              "
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>

          <div className="flex-1 overflow-y-auto bg-slate-50 rounded-2xl p-6 border">
            {!summary && !loading && (
              <div className="text-center mt-20 text-slate-400">
                Click Generate Summary to create notes
              </div>
            )}

            {loading && (
              <div className="text-center mt-20">
                <div className="animate-pulse text-sky-500 text-lg">
                  AI is reading your document...
                </div>
              </div>
            )}

            {summary && (
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;
