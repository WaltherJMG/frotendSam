import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [prod, usrs, movs] = await Promise.all([
        apiFetch("/productos/select"),   
        apiFetch("/auth/list-user"),     
        apiFetch("/movimientos")         
      ]);

      setProductos(prod || []);
      setUsuarios(usrs || []);
      setMovimientos(movs || []);
    } catch (err) {
      console.error("Error cargando datos del dashboard:", err);
      setProductos([]);
      setUsuarios([]);
      setMovimientos([]);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      {cargando ? (
        <p className="text-gray-500">Cargando datos...</p>
      ) : (
        <>
          {/* Resumen de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">Total de Productos</p>
              <p className="text-2xl font-bold text-blue-600">{productos.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">Total de Usuarios</p>
              <p className="text-2xl font-bold text-green-600">{usuarios.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">Total de Movimientos</p>
              <p className="text-2xl font-bold text-purple-600">{movimientos.length}</p>
            </div>
          </div>

          {/* Últimos movimientos */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Últimos Movimientos</h2>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Fecha</th>
                  <th className="p-3 text-left">Usuario</th>
                  <th className="p-3 text-left">Producto</th>
                  <th className="p-3 text-left">Tipo</th>
                  <th className="p-3 text-right">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.slice(0, 10).map((m, i) => (
                  <tr key={m.id} className={`border-t ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="p-3 text-gray-500">{new Date(m.fecha).toLocaleString()}</td>
                    <td className="p-3">{m.usuario_nombre || m.usuario_id}</td>
                    <td className="p-3">{m.producto_nombre || m.producto_id}</td>
                    <td className={`p-3 font-semibold ${m.tipo === "ENTRADA" ? "text-green-600" : "text-red-600"}`}>{m.tipo}</td>
                    <td className="p-3 text-right">{m.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {movimientos.length === 0 && (
              <p className="text-gray-500 mt-4 text-center">No hay movimientos registrados.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
