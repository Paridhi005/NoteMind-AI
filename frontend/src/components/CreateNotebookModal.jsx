import { useState } from "react";
import API from "../services/api";

function CreateNotebookModal({ isOpen, onClose }) {
const [title, setTitle] = useState("");

if (!isOpen) return null;

const createNotebook = async () => {
try {
const user = JSON.parse(
localStorage.getItem("user")
);


  await API.post("/notebooks", {
    title,
    userId: user.id,
  });

  window.location.reload();

  onClose();
} catch (error) {
  console.error(error);
}


};

return ( <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"> <div className="bg-white w-[500px] rounded-3xl p-8 shadow-2xl"> <h2 className="text-3xl font-bold mb-6">
Create Notebook </h2>


    <input
      type="text"
      placeholder="Notebook Name"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full border rounded-xl p-4 mb-4"
    />

    <input
      type="text"
      placeholder="Subject"
      className="w-full border rounded-xl p-4 mb-6"
    />

    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-5 py-3 rounded-xl bg-slate-100"
      >
        Cancel
      </button>

      <button
        onClick={createNotebook}
        className="px-5 py-3 rounded-xl bg-sky-500 text-white"
      >
        Create
      </button>
    </div>
  </div>
</div>


);
}

export default CreateNotebookModal;
