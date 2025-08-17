import { NavLink } from "react-router-dom";

export default function Header() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Form", path: "/form" },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex justify-center py-4 space-x-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}