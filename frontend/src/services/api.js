import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://notemind-ai-9sqb.onrender.com/api",
});

export default API;