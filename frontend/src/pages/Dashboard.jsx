import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import API from "../services/api";

import {
  FaHome,
  FaBook,
  FaRobot,
  FaFileAlt,
  FaQuestionCircle,
  FaLayerGroup,
} from "react-icons/fa";

function Dashboard() {
  const [notebooks, setNotebooks] = useState([]);
  const [documentCount, setDocumentCount] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const notebookRes = await API.get("/notebooks");

      setNotebooks(notebookRes.data);

      let totalDocs = 0;

      for (const notebook of notebookRes.data) {
        try {
          const docsRes = await API.get(`/documents/notebook/${notebook._id}`);

          totalDocs += docsRes.data.length;
        } catch (err) {
          console.log(err);
        }
      }

      setDocumentCount(totalDocs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <img src={logo} alt="logo" className="h-12" />
        </div>

        <div className="flex flex-col gap-2 p-4">
          <button className="flex items-center gap-3 text-left px-4 py-3 rounded-xl bg-sky-100 text-sky-600 font-semibold">
            <FaHome />
            Dashboard
          </button>

          <button className="flex items-center gap-3 text-left px-4 py-3 rounded-xl hover:bg-slate-100">
            <FaBook />
            My Notebooks
          </button>

          <button className="flex items-center gap-3 text-left px-4 py-3 rounded-xl hover:bg-slate-100">
            <FaRobot />
            AI Chat
          </button>

          <button className="flex items-center gap-3 text-left px-4 py-3 rounded-xl hover:bg-slate-100">
            <FaFileAlt />
            Summary
          </button>

          <button className="flex items-center gap-3 text-left px-4 py-3 rounded-xl hover:bg-slate-100">
            <FaQuestionCircle />
            Quiz
          </button>

          <button className="flex items-center gap-3 text-left px-4 py-3 rounded-xl hover:bg-slate-100">
            <FaLayerGroup />
            Flashcards
          </button>
        </div>

        <div className="mt-auto p-4">
          <button className="w-full bg-red-50 text-red-500 py-3 rounded-xl">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back to NoteMind AI!
            </h1>

            <p className="text-slate-500">
              Let's continue your AI-powered learning journey.
            </p>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search notes..."
              className="px-4 py-3 rounded-xl border w-80"
            />

            <button className="bg-sky-500 text-white px-6 py-3 rounded-xl">
              Upload PDF
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-slate-500">Notebooks</h3>
                <p className="text-3xl font-bold mt-2">{notebooks.length}</p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                <FaBook />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-slate-500">Documents</h3>
                <p className="text-3xl font-bold mt-2">{documentCount}</p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                <FaFileAlt />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-slate-500">Quizzes</h3>
                <p className="text-3xl font-bold mt-2">{documentCount * 5}</p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                <FaQuestionCircle />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-slate-500">Flashcards</h3>
                <p className="text-3xl font-bold mt-2">{documentCount * 5}</p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                <FaLayerGroup />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notebooks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-5">Recent Notebooks</h2>

          <div className="grid grid-cols-4 gap-6">
            {notebooks.map((notebook) => (
              <div
                key={notebook._id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
              >
                <div className="text-3xl mb-3">📚</div>

                <h3 className="font-semibold">{notebook.title}</h3>

                <p className="text-sm text-slate-500 mt-2">AI Study Notebook</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-5">Quick Actions</h2>

          <div className="grid grid-cols-4 gap-6">
            <div className="bg-sky-500 text-white p-8 rounded-2xl h-40 flex items-center text-xl font-semibold hover:scale-105 transition cursor-pointer">
              Generate Summary
            </div>

            <div className="bg-blue-500 text-white p-8 rounded-2xl h-40 flex items-center text-xl font-semibold hover:scale-105 transition cursor-pointer">
              Generate Quiz
            </div>

            <div className="bg-indigo-500 text-white p-8 rounded-2xl h-40 flex items-center text-xl font-semibold hover:scale-105 transition cursor-pointer">
              Create Flashcards
            </div>

            <div className="bg-cyan-500 text-white p-8 rounded-2xl h-40 flex items-center text-xl font-semibold hover:scale-105 transition cursor-pointer">
              AI Chat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
