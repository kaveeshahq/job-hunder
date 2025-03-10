import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`backdrop-blur-sm bg-white bg-opacity-90 p-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "shadow-lg border-b border-blue-100" 
          : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="group">
          <div className="text-3xl font-extrabold relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 group-hover:from-blue-500 group-hover:to-blue-300 transition-all duration-300">
              VitaeXtract
            </span>
            <span className="text-blue-600 group-hover:text-blue-500 transition-colors duration-300">.</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-500"></div>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-blue-600 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
        <ul className="hidden lg:flex space-x-8">
          {["Home", "Click to Start"].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item === "Home" ? "/" : "/apply"}
                className={({ isActive }) =>
                  `relative px-2 py-1 font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item}</span>
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden absolute left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-56 border-b border-blue-100" : "max-h-0"
        }`}
      >
        <ul className="p-4 space-y-4">
          {["Home", "Click to Start"].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item === "Home" ? "/" : "/apply"}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}