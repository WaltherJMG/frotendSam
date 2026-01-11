import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white shadow  flex justify-between items-center h-[88px] pe-2 ps-2">
      <h1 className="font-semibold text-gray-700">
        Panel de Administración
      </h1>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-1 rounded transition duration-300 ease-in-out hover:bg-red-700 cursor-pointer "
      >
        Cerrar sesión
      </button>
    </header>
  );
}
