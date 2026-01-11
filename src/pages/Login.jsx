import { useState } from "react";
import { apiFetch } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones básicas
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      if (!data.token) {
        setError("Correo o contraseña incorrectos");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      setSuccess("Acceso concedido. Redirigiendo...");

      setTimeout(() => {
        window.location.href = "/productos";
      }, 1200);

    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sistema de Inventario
        </h1>

        {/* ALERTA ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* ALERTA SUCCESS */}
        {success && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <label className="text-sm font-medium text-gray-600">
          Correo electrónico
        </label>
        <input
          type="email"
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="correo@ejemplo.com"
          onChange={e => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-600">
          Contraseña
        </label>
        <input
          type="password"
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className={`w-full p-2 rounded text-white transition
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Validando..." : "Ingresar"}
        </button>

        <p className="text-sm mt-5 text-center text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
