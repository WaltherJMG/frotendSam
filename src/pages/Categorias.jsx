import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });

  // =====================
  // CARGAR CATEGORÍAS
  // =====================
  const cargarCategorias = async () => {
    const data = await apiFetch("/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // =====================
  // FORM
  // =====================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ id: "", nombre: "", descripcion: "" });
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editando) {
      await apiFetch(`/categorias/${form.id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
    } else {
      await apiFetch("/categorias", {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    resetForm();
    cargarCategorias();
  };

  // =====================
  // EDITAR / ELIMINAR
  // =====================
  const editarCategoria = (c) => {
    setForm({
      id: c.id,
      nombre: c.nombre,
      descripcion: c.descripcion || "",
    });
    setEditando(true);
  };

  const eliminarCategoria = async (id) => {
    const ok = window.confirm(
      "¿Seguro que deseas eliminar esta categoría?"
    );
    if (!ok) return;

    await apiFetch(`/categorias/${id}`, {
      method: "DELETE",
    });

    cargarCategorias();
  };

  return (
    <div className="space-y-6">

      {/* TÍTULO */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Categorías</h1>
        <p className="text-sm text-gray-500">
          Administración de categorías de productos
        </p>
      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {editando ? "Editar categoría" : "Nueva categoría"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="ID"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
            disabled={editando}
          />

          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <div className="md:col-span-3 flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editando ? "Actualizar" : "Guardar"}
            </button>

            {editando && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c, i) => (
              <tr
                key={c.id}
                className={`border-t ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-3 font-mono">{c.id}</td>
                <td className="p-3">{c.nombre}</td>
                <td className="p-3 text-gray-600">{c.descripcion}</td>
                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => editarCategoria(c)}
                    className="bg-amber-400 p-2 rounded font-bold cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCategoria(c.id)}
                    className="bg-red-400 p-2 rounded font-bold cursor-pointer"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
