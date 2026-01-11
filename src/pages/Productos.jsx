import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock_actual: "",
    categoria_id: "",
  });

  // =====================
  // CARGAS
  // =====================
  const cargarProductos = async () => {
    const data = await apiFetch("/productos");
    setProductos(data);
  };

  const cargarCategorias = async () => {
    const data = await apiFetch("/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  // =====================
  // FORM
  // =====================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      id: "",
      nombre: "",
      descripcion: "",
      precio: "",
      stock_actual: "",
      categoria_id: "",
    });
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      precio: Number(form.precio),
      stock_actual: Number(form.stock_actual),
      categoria_id: Number(form.categoria_id),
    };

    if (editando) {
      await apiFetch(`/productos/${form.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await apiFetch("/productos", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    cargarProductos();
  };

  // =====================
  // EDITAR / ELIMINAR
  // =====================
  const editarProducto = (p) => {
    setForm({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion || "",
      precio: p.precio,
      stock_actual: p.stock_actual,
      categoria_id: p.categoria_id,
    });
    setEditando(true);
  };

  const eliminarProducto = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!ok) return;

    await apiFetch(`/productos/${id}`, {
      method: "DELETE",
    });

    cargarProductos();
  };

  return (
    <div className="space-y-6">

      {/* TÍTULO */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
        <p className="text-sm text-gray-500">
          Gestión de productos y control de inventario
        </p>
      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {editando ? "Editar producto" : "Registrar nuevo producto"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="Código"
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
            name="precio"
            type="number"
            step="0.01"
            value={form.precio}
            onChange={handleChange}
            placeholder="Precio"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="stock_actual"
            type="number"
            value={form.stock_actual}
            onChange={handleChange}
            placeholder="Stock"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="categoria_id"
            value={form.categoria_id}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción del dispositivo"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 md:col-span-6"
            rows="3"
          />

          <div className="md:col-span-6 flex gap-3">
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
              <th className="p-3 text-left">Código</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Categoría</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, i) => (
              <tr
                key={p.id}
                className={`border-t ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-3 font-mono">{p.id}</td>
                <td className="p-3">{p.nombre}</td>
                <td className="p-3 text-gray-600">{p.descripcion}</td>
                <td className="p-3">${p.precio}</td>
                <td className="p-3">{p.stock_actual}</td>
                <td className="p-3">{p.categoria}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => editarProducto(p)}
                    className=" bg-amber-400 p-2 rounded font-bold cursor-pointer "
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarProducto(p.id)}
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
