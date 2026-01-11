import { useState } from "react";
import { apiFetch } from "../api/api";

export default function CategoriaForm({ onSuccess }) {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    descripcion: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await apiFetch("/categorias", {
      method: "POST",
      body: JSON.stringify(form)
    });

    onSuccess && onSuccess();
    alert("Categoría creada");
  };

  return (
    <form className="bg-white p-4 shadow rounded" onSubmit={submit}>
      <h2 className="text-lg font-bold mb-3">Nueva Categoría</h2>

      <input name="id" placeholder="ID"
        className="border p-2 w-full mb-2"
        onChange={handleChange} />

      <input name="nombre" placeholder="Nombre"
        className="border p-2 w-full mb-2"
        onChange={handleChange} />

      <textarea name="descripcion" placeholder="Descripción"
        className="border p-2 w-full mb-3"
        onChange={handleChange} />

      <button className="bg-green-600 text-white p-2 w-full rounded">
        Guardar
      </button>
    </form>
  );
}
