import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // nuevo componente
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import Movimientos from "./pages/Movimientos";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./Layout/DashboardLayout";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS PRIVADAS CON LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirigir "/" al Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/movimientos" element={<Movimientos />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
