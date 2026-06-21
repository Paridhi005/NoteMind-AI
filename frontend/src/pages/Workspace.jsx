import { FaFilePdf, FaRobot, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import SummaryModal from "../components/SummaryModal";
import QuizModal from "../components/QuizModal";
import FlashcardModal from "../components/FlashcardModal";
import ChatModal from "../components/ChatModal";

function Workspace() {
  const { id } = useParams();

  const [documents, setDocuments] = useState([]);
  const [notebook, setNotebook] = useState(null);

  const [showSummary, setShowSummary] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await API.get(`/documents/notebook/${id}`);

      setDocuments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotebook = async () => {
    try {
      const res = await API.get(`/notebooks/${id}`);

      setNotebook(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchDocuments();
      await fetchNotebook();
    };

    loadData();
  }, [id]);

  const deletePDF = async (documentId) => {
    try {
      await API.delete(`/documents/${documentId}`);

      await fetchDocuments();

      alert("PDF Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadPDF = async (e) => {
    try {
      const file = e.target.files[0];

      const formData = new FormData();

      formData.append("pdf", file);
      formData.append("notebookId", id);

      await API.post("/documents/upload", formData);

      fetchDocuments();

      alert("PDF Uploaded Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b px-10 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {notebook?.title || "Loading..."}
            </h1>

            <p className="text-slate-500">{documents.length} Documents</p>
          </div>

          <label
            className="
          bg-gradient-to-r
          from-sky-500
          to-blue-600
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          cursor-pointer
        "
          >
            Upload PDF
            <input type="file" accept=".pdf" onChange={uploadPDF} hidden />
          </label>
        </div>

        {/* Main */}
        <div className="grid grid-cols-12 gap-6 p-8">
          {/* Documents */}
          <div className="col-span-4">
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-5">Documents</h2>

              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc._id}
                    className="
      border
      rounded-2xl
      p-4
      flex
      items-center
      justify-between
    "
                  >
                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-red-500 text-2xl" />

                      {doc.fileName}
                    </div>

                    <button
                      onClick={() => deletePDF(doc._id)}
                      className="
        text-red-500
        hover:text-red-700
      "
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Tools */}
          <div className="col-span-8">
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">AI Study Tools</h2>

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => {
                    if (!documents.length) {
                      alert("Upload PDF First");
                      return;
                    }

                    setSelectedDocument(documents[0]._id);
                    setShowSummary(true);
                  }}
                  className="bg-sky-500 text-white p-8 rounded-3xl"
                >
                  Generate Summary
                </button>

                <button
                  onClick={() => {
                    if (!documents.length) {
                      alert("Upload PDF First");
                      return;
                    }

                    setSelectedDocument(documents[0]._id);
                    setShowQuiz(true);
                  }}
                  className="bg-blue-500 text-white p-8 rounded-3xl"
                >
                  Generate Quiz
                </button>

                <button
                  onClick={() => {
                    if (!documents.length) {
                      alert("Upload PDF First");
                      return;
                    }

                    setSelectedDocument(documents[0]._id);
                    setShowFlashcards(true);
                  }}
                  className="bg-indigo-500 text-white p-8 rounded-3xl"
                >
                  Generate Flashcards
                </button>

                <button
                  onClick={() => {
                    if (!documents.length) {
                      alert("Upload PDF First");
                      return;
                    }

                    setSelectedDocument(documents[0]._id);
                    setShowChat(true);
                  }}
                  className="bg-cyan-500 text-white p-8 rounded-3xl flex items-center justify-center gap-3"
                >
                  <FaRobot />
                  AI Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        documentId={selectedDocument}
      />

      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        documentId={selectedDocument}
      />

      <FlashcardModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        documentId={selectedDocument}
      />

      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        documentId={selectedDocument}
      />
    </>
  );
}

export default Workspace;
