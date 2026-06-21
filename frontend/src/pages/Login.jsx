import logo from "../assets/logo.png";
import hero from "../assets/hero.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/notebooks");
    }
  }, [navigate]);

  const loginUser = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/notebooks");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 flex">
      {/* Left Section */}
      <div className="w-[55%] flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold text-slate-800 leading-tight">
          Study Smarter with AI
        </h1>

        <p className="text-slate-500 text-lg mt-5 mb-8 max-w-xl">
          Upload notes, generate summaries, create quizzes, flashcards and learn
          faster with NoteMind AI.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-white shadow px-4 py-2 rounded-full text-sky-600 font-medium">
            ✓ AI Chat
          </span>

          <span className="bg-white shadow px-4 py-2 rounded-full text-sky-600 font-medium">
            ✓ Smart Notes
          </span>

          <span className="bg-white shadow px-4 py-2 rounded-full text-sky-600 font-medium">
            ✓ Quiz Generator
          </span>

          <span className="bg-white shadow px-4 py-2 rounded-full text-sky-600 font-medium">
            ✓ Flashcards
          </span>
        </div>

        <img src={hero} alt="hero" className="max-w-4xl" />
      </div>

      {/* Right Section */}
      <div className="w-[45%] flex items-center justify-center">
        <div
          className="
      bg-white/90
      backdrop-blur-md
      shadow-2xl
      border
      border-white
      rounded-3xl
      p-10
      w-[500px]
    "
        >
          <img src={logo} alt="logo" className="h-16 mx-auto mb-8" />

          <h2 className="text-4xl font-bold text-center text-slate-800">
            Welcome Back
          </h2>

          <p className="text-center text-slate-500 mt-3 mb-8">
            Continue your smart learning journey
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
        w-full
        border
        border-slate-200
        rounded-xl
        p-4
        mb-4
        outline-none
        focus:border-sky-500
      "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
        w-full
        border
        border-slate-200
        rounded-xl
        p-4
        mb-6
        outline-none
        focus:border-sky-500
      "
          />

          <button
            onClick={loginUser}
            className="
        w-full
        py-4
        rounded-xl
        text-white
        font-semibold
        bg-gradient-to-r
        from-sky-500
        to-blue-600
        hover:scale-[1.02]
        transition
      "
          >
            Login
          </button>

          <p className="text-center mt-6 text-slate-500">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-sky-600 font-semibold ml-2 cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
