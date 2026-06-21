import { useState } from "react";
import API from "../services/api";

function SummaryModal({ documentId, isOpen, onClose }) {
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

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[900px] max-h-[80vh] overflow-y-auto rounded-3xl p-8">

        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold">
            AI Summary
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <button
          onClick={generateSummary}
          className="bg-sky-500 text-white px-6 py-3 rounded-xl mb-6"
        >
          Generate Summary
        </button>

        {loading && (
          <p>Generating summary...</p>
        )}

        <pre className="whitespace-pre-wrap text-slate-700">
          {summary}
        </pre>

      </div>
    </div>
  );
}

export default SummaryModal;