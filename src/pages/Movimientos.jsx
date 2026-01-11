import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function Movimientos() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [form, setForm] = useState({
    producto_id: "",
    usuario_id: "",
    tipo: "ENTRADA",
    cantidad: "",
  });

  // =====================
  // CARGAR DATOS
  // =====================
  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [prod, usrs, movs] = await Promise.all([
        apiFetch("/productos/select"),
        apiFetch("/auth/list-user"),
        apiFetch("/movimientos"),
      ]);

      setProductos(prod || []);
      setUsuarios(usrs || []);
      setMovimientos(movs || []);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setProductos([]);
      setUsuarios([]);
      setMovimientos([]);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // =====================
  // HANDLE CHANGE
  // =====================
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "tipo") value = value.toUpperCase();
    setForm({ ...form, [e.target.name]: value });
  };

  // =====================
  // REGISTRAR MOVIMIENTO
  // =====================
  const submit = async (e) => {
    e.preventDefault();
    if (!form.usuario_id || !form.producto_id || !form.cantidad) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await apiFetch("/movimientos", {
        method: "POST",
        body: JSON.stringify({
          producto_id: form.producto_id,
          usuario_id: parseInt(form.usuario_id, 10),
          tipo: form.tipo,
          cantidad: parseInt(form.cantidad, 10),
        }),
      });

      setForm({ producto_id: "", usuario_id: "", tipo: "ENTRADA", cantidad: "" });
      cargarDatos();
    } catch (err) {
      console.error("Error registrando movimiento:", err);
      alert("No se pudo registrar el movimiento");
    }
  };

  // =====================
  // ELIMINAR MOVIMIENTO
  // =====================
  const deleteMovimiento = async (id) => {
    if (!window.confirm("¿Seguro que desea eliminar este movimiento?")) return;
    try {
      await apiFetch(`/movimientos/${id}`, { method: "DELETE" });
      setMovimientos((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el movimiento");
    }
  };

  // =====================
  // EDITAR MOVIMIENTO
  // =====================
  const updateMovimiento = async (id, tipo, cantidad) => {
    try {
      await apiFetch(`/movimientos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ tipo, cantidad }),
      });
      cargarDatos();
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el movimiento");
    }
  };

  // =====================
  // RENDER
  // =====================
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Movimientos</h1>
      <p className="text-sm text-gray-500">Registro de entradas y salidas de productos</p>

      {/* FORMULARIO */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Nuevo movimiento</h2>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Usuario */}
          <select
            name="usuario_id"
            value={form.usuario_id}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          >
            <option value="">{cargando ? "Cargando usuarios..." : "Seleccionar usuario"}</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>{u.nombre}</option>
            ))}
          </select>

          {/* Producto */}
          <select
            name="producto_id"
            value={form.producto_id}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          >
            <option value="">{cargando ? "Cargando productos..." : "Seleccionar producto"}</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>

          {/* Tipo */}
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="ENTRADA">Entrada</option>
            <option value="SALIDA">Salida</option>
          </select>

          {/* Cantidad */}
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            min={1}
            placeholder="Cantidad"
            required
            className="border rounded px-3 py-2"
          />

          <div className="md:col-span-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Registrar movimiento
            </button>
          </div>
        </form>
      </div>

      {/* TABLA DE MOVIMIENTOS */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm text-center">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-center">Fecha</th>
              <th className="p-3 text-center">Usuario</th>
              <th className="p-3 text-center">Producto</th>
              <th className="p-3 text-center">Tipo</th>
              <th className="p-3 text-center">Cantidad</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 text-center text-gray-500">
                  No hay movimientos
                </td>
              </tr>
            ) : (
              movimientos.map((m, i) => (
                <tr key={m.id} className={`border-t ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="p-3 text-gray-500">{new Date(m.fecha).toLocaleString()}</td>
                  <td className="p-3">{m.usuario_nombre || m.usuario_id}</td>
                  <td className="p-3">{m.producto_nombre || m.producto_id}</td>
                  <td className={`p-3 font-semibold ${m.tipo === "ENTRADA" ? "text-green-600" : "text-red-600"}`}>
                    {m.tipo}
                  </td>
                  <td className="p-3 text-center">{m.cantidad}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        const nuevaCantidad = prompt("Ingrese nueva cantidad:", m.cantidad);
                        if (!nuevaCantidad) return;
                        const nuevoTipo = prompt("Ingrese tipo (ENTRADA/SALIDA):", m.tipo);
                        if (!nuevoTipo) return;
                        updateMovimiento(m.id, nuevoTipo.toUpperCase(), parseInt(nuevaCantidad, 10));
                      }}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteMovimiento(m.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
