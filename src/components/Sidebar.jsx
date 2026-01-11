import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 3h18v18H3V3z" />
      </svg>
    )
  },
  {
    to: "/productos",
    label: "Productos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-8 5-8-5m16 0l-8-5-8 5" />
      </svg>
    )
  },
  {
    to: "/categorias",
    label: "Categorías",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    )
  },
  {
    to: "/movimientos",
    label: "Movimientos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 10h11M9 21l-6-6 6-6M21 14H10m6-11l6 6-6 6" />
      </svg>
    )
  }
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
   ${
     isActive
       ? "bg-blue-600 text-white shadow"
       : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
   }`;

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-sm flex flex-col">
      
      {/* LOGO / TITULO */}
      <div className="p-5 shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          Inventario
        </h1>
        <p className="text-xs text-gray-500">
          Panel de administración
        </p>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-1 shadow">
        {links.map(link => (
          <NavLink key={link.to} to={link.to} className={linkClass}>
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-4 text-sm text-center">
        © 2025 Inventario
      </div>
    </aside>
  );
}
