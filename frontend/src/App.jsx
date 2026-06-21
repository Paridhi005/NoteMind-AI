import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Notebooks from "./pages/Notebooks";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/notebooks"
          element={
            <ProtectedRoute>
              <Notebooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notebook/:id"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
