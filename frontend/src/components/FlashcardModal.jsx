import { useState } from "react";
import API from "../services/api";
import flashcardImg from "../assets/flashcard.png";
import { FaTimes, FaLayerGroup } from "react-icons/fa";

function FlashcardModal({ isOpen, onClose, documentId }) {
  // remove this line completely
  const [loading, setLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!isOpen) return null;

  const generateFlashcards = async () => {
    try {
      setLoading(true);

      const res = await API.post("/flashcards", {
        documentId,
      });

      const data = res.data.flashcards;

      

      const parsedCards = data
        .split("Q:")
        .filter((item) => item.trim() !== "")
        .map((item) => {
          const parts = item.split("A:");

          return {
            question: parts[0]?.trim(),
            answer: parts[1]?.trim(),
          };
        });

      setCards(parsedCards);

      setCurrentCard(0);
      setShowAnswer(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[1100px] h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex">

        {/* LEFT PANEL */}
        <div className="w-[35%] bg-gradient-to-br from-indigo-500 to-violet-700 text-white p-8 flex flex-col">

          <div className="flex items-center gap-3 mb-6">
            <FaLayerGroup className="text-3xl" />
            <h2 className="text-3xl font-bold">
              Flashcards
            </h2>
          </div>

          <p className="text-white/80 mb-8">
            Learn faster using AI generated study cards.
          </p>

          <img
            src={flashcardImg}
            alt="flashcard"
            className="w-full mt-auto"
          />

        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-8 flex flex-col">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              AI Flashcards
            </h2>

            <button
              onClick={onClose}
              className="text-2xl text-slate-500 hover:text-red-500"
            >
              <FaTimes />
            </button>

          </div>

          <button
            onClick={generateFlashcards}
            className="
            bg-indigo-500
            hover:bg-indigo-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            mb-6
            w-fit
            "
          >
            {loading
              ? "Generating..."
              : "Generate Flashcards"}
          </button>

          <div className="flex-1 flex items-center justify-center">

            {!loading && cards.length === 0 && (
              <div className="text-slate-400">
                Generate flashcards to begin
              </div>
            )}

            {loading && (
              <div className="animate-pulse text-indigo-500 text-lg">
                AI is creating flashcards...
              </div>
            )}

            {cards.length > 0 && (
              <div className="w-full max-w-2xl">

                <div className="text-center mb-4 font-semibold text-indigo-600">
                  Card {currentCard + 1} / {cards.length}
                </div>

                <div className="bg-white border shadow-xl rounded-3xl p-10 min-h-[320px] flex flex-col justify-center">

                  <h3 className="text-xl font-bold mb-6">
                    Question
                  </h3>

                  <p className="text-lg text-slate-700">
                    {cards[currentCard]?.question}
                  </p>

                  {showAnswer && (
                    <div className="mt-8 border-t pt-6">

                      <h3 className="font-bold text-indigo-600 mb-3">
                        Answer
                      </h3>

                      <p className="text-slate-700">
                        {cards[currentCard]?.answer}
                      </p>

                    </div>
                  )}

                </div>

                <div className="flex justify-center gap-4 mt-6">

                  <button
                    onClick={prevCard}
                    className="bg-slate-200 px-5 py-3 rounded-xl"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() =>
                      setShowAnswer(!showAnswer)
                    }
                    className="bg-indigo-500 text-white px-5 py-3 rounded-xl"
                  >
                    {showAnswer
                      ? "Hide Answer"
                      : "Show Answer"}
                  </button>

                  <button
                    onClick={nextCard}
                    className="bg-indigo-500 text-white px-5 py-3 rounded-xl"
                  >
                    Next
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default FlashcardModal;