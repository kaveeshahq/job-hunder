import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-3xl font-extrabold text-blue-600">JobThunder.</div>
      <ul className="flex space-x-6">
        {["Home", "Join Us",].map((item, index) => (
          <li key={index}>
            <NavLink
              to={item === "Home" ? "/" : "/apply"}
              className={({ isActive }) =>
                `font-bold text-gray-800 hover:text-blue-600 relative
                after:block after:h-1 after:w-full after:bg-blue-600 after:scale-x-0
                hover:after:scale-x-100 after:transition-transform after:duration-300
                ${isActive ? "text-blue-600 after:scale-x-100" : ""}`
              }
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Comment