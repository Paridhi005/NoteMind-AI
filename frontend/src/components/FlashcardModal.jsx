import { useState } from "react";
import API from "../services/api";

function FlashcardModal({ isOpen, onClose, documentId }) {
  const [flashcards, setFlashcards] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const generateFlashcards = async () => {
    try {
      setLoading(true);

      const res = await API.post("/flashcards", {
        documentId,
      });

      setFlashcards(res.data.flashcards);
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
            AI Flashcards
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <button
          onClick={generateFlashcards}
          className="bg-indigo-500 text-white px-6 py-3 rounded-xl mb-6"
        >
          Generate Flashcards
        </button>

        {loading && (
          <p>Generating flashcards...</p>
        )}

        {flashcards && (
          <div className="whitespace-pre-wrap bg-slate-50 p-5 rounded-2xl">
            {flashcards}
          </div>
        )}

      </div>
    </div>
  );
}

export default FlashcardModal;