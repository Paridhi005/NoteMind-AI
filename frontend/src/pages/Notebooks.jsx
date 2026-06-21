import hero from "../assets/hero.png";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import CreateNotebookModal from "../components/CreateNotebookModal";
import Navbar from "../components/Navbar";

function Notebook() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [notebooks, setNotebooks] = useState([]);

  const [stats, setStats] = useState({
    notebooks: 0,
    documents: 0,
  });

  const fetchNotebooks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get(`/notebooks?userId=${user.id}`);
      setNotebooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/notebooks/stats/dashboard");

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotebook = async (notebookId) => {
    try {
      await API.delete(`/notebooks/${notebookId}`);

      fetchNotebooks();

      alert("Notebook Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchNotebooks();
      await fetchStats();
    };

    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 p-10">
        {/* Hero */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-slate-800">My Notebooks</h1>

            <p className="text-slate-500 text-lg mt-3">
              Organize notes, summaries, quizzes and flashcards
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img src={hero} alt="hero" className="w-72" />

            <button
              onClick={() => setShowModal(true)}
              className="
              flex items-center gap-3
              bg-gradient-to-r
              from-sky-500
              to-blue-600
              text-white
              px-6
              py-4
              rounded-2xl
              font-semibold
              shadow-lg
              hover:scale-105
              transition
            "
            >
              <FaPlus />
              Create Notebook
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <p className="text-slate-500">Total Notebooks</p>
            <h2 className="text-4xl font-bold mt-2">{notebooks.length}</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <p className="text-slate-500">Documents</p>
            <h2 className="text-4xl font-bold mt-2">{stats.documents}</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <p className="text-slate-500">Quizzes</p>
            <h2 className="text-4xl font-bold mt-2">36</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <p className="text-slate-500">Flashcards</p>
            <h2 className="text-4xl font-bold mt-2">24</h2>
          </div>
        </div>

        {/* Notebook Cards */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Your Notebooks
          </h2>

          <div className="grid grid-cols-2 gap-8">
            {notebooks.map((notebook) => (
              <div
                key={notebook._id}
                onClick={() => navigate(`/notebook/${notebook._id}`)}
                className="
                relative
                bg-gradient-to-br
                from-sky-500
                to-blue-600
                text-white
                p-8
                rounded-3xl
                shadow-xl
                hover:-translate-y-2
                hover:shadow-2xl
                transition
                cursor-pointer
              "
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (window.confirm("Delete this notebook?")) {
                      deleteNotebook(notebook._id);
                    }
                  }}
                  className="
                  absolute
                  top-5
                  right-5
                  text-white
                  hover:text-red-200
                "
                >
                  <FaTrash />
                </button>

                <div className="text-5xl mb-5">📘</div>

                <h3 className="text-2xl font-bold">{notebook.title}</h3>

                <p className="mt-3 text-white/80">Click to Open</p>
              </div>
            ))}
          </div>
        </div>

        <CreateNotebookModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </>
  );
}

export default Notebook;
