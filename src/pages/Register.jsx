import { useState } from "react";
import { apiFetch } from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    type: "", // success | error
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (form.nombre.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "El correo electrónico no es válido";
    }

    if (form.password.length < 6) {
      return "La contraseña debe tener mínimo 6 caracteres";
    }

    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    const error = validateForm();
    if (error) {
      setAlert({ type: "error", message: error });
      return;
    }

    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (res.message) {
        setAlert({
          type: "success",
          message: "Usuario registrado correctamente",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (err) {
      setAlert({
        type: "error",
        message: "Error al registrar el usuario",
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        className="bg-white p-6 rounded shadow w-96"
        onSubmit={submit}
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          Registro de Usuario
        </h1>

        {/* Banner de alertas */}
        {alert.message && (
          <div
            className={`mb-4 p-3 rounded text-sm text-center ${
              alert.type === "error"
                ? "bg-blue-100 text-blue-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {alert.message}
          </div>
        )}

        <input
          name="nombre"
          placeholder="Nombre completo"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white w-full p-2 rounded"
        >
          Registrarse
        </button>

        <p className="text-sm mt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/" className="text-blue-600 underline">
            Iniciar sesión
          </a>
        </p>
      </form>
    </div>
  );
}
