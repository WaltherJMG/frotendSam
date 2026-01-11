import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function ProductoForm({ onSuccess }) {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock_actual: "",
    categoria_id: ""
  });

  useEffect(() => {
    apiFetch("/categorias").then(setCategorias);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await apiFetch("/productos", {
      method: "POST",
      body: JSON.stringify(form)
    });

    onSuccess && onSuccess();
    alert("Producto creado");
  };

  return (
    <form className="bg-white p-4 shadow rounded" onSubmit={submit}>
      <h2 className="text-lg font-bold mb-3">Nuevo Producto</h2>

      <input name="id" placeholder="Código"
        className="border-0 outline-0 p-2 w-full mb-2"
        onChange={handleChange} />

      <input name="nombre" placeholder="Nombre"
        className="border-0 outline-0 p-2 w-full mb-2"
        onChange={handleChange} />

      <textarea name="descripcion" placeholder="Descripción"
        className="border-0 outline-0 p-2 w-full mb-2"
        onChange={handleChange} />

      <input name="precio" type="number" step="0.01"
        placeholder="Precio"
        className="border-0 outline-0 p-2 w-full mb-2"
        onChange={handleChange} />

      <input name="stock_actual" type="number"
        placeholder="Stock inicial"
        className="border-0 outline-0 p-2 w-full mb-2"
        onChange={handleChange} />

      <select name="categoria_id"
        className="border-0 p-2 w-full mb-3 outline-0 "
        onChange={handleChange}>
        <option value="">Seleccione categoría</option>
        {categorias.map(c => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>

      <button className="bg-blue-600 text-white p-2 w-full rounded cursor-pointer">
        Guardar
      </button>
    </form>
  );
}
