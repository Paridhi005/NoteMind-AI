import logo from "../assets/logo.png";
import hero from "../assets/hero.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const registerUser = async () => {
try {
const res = await API.post("/auth/register", {
name,
email,
password,
});


  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  alert("Registration Successful");

  navigate("/notebooks");
} catch (error) {
  alert(
    error.response?.data?.message ||
    "Registration Failed"
  );
}


};

return ( <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 flex">


  {/* Left Section */}
  <div className="w-[55%] flex flex-col justify-center px-16">

    <h1 className="text-4xl font-bold text-slate-800 leading-tight">
      Start Learning Smarter
    </h1>

    <p className="text-slate-500 text-lg mt-5 mb-8 max-w-xl">
      Create your account and unlock AI-powered
      summaries, quizzes, flashcards and smart study
      assistance.
    </p>

    <img
      src={hero}
      alt="hero"
      className="max-w-4xl"
    />
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
      <img
        src={logo}
        alt="logo"
        className="h-16 mx-auto mb-8"
      />

      <h2 className="text-4xl font-bold text-center text-slate-800">
        Create Account
      </h2>

      <p className="text-center text-slate-500 mt-3 mb-8">
        Join NoteMind AI today
      </p>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
        w-full
        border
        border-slate-200
        rounded-xl
        p-4
        mb-4
      "
      />

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
      "
      />

      <button
        onClick={registerUser}
        className="
        w-full
        py-4
        rounded-xl
        text-white
        font-semibold
        bg-gradient-to-r
        from-sky-500
        to-blue-600
      "
      >
        Create Account
      </button>

      <p className="text-center mt-6 text-slate-500">
        Already have an account?
        <span
          onClick={() => navigate("/")}
          className="
            text-sky-600
            font-semibold
            ml-2
            cursor-pointer
          "
        >
          Login
        </span>
      </p>
    </div>

  </div>
</div>


);
}

export default Register;
