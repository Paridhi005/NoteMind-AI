import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="bg-white border-b px-10 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-sky-600">
        NoteMind AI
      </h1>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-slate-700">
          <FaUserCircle className="text-2xl" />

          <span className="font-medium">
            {user?.name}
          </span>
        </div>

        <button
          onClick={logout}
          className="
            flex items-center gap-2
            text-red-500
            font-medium
          "
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;