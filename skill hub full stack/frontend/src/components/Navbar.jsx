import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="glass-nav">
      <div className="nav-logo">
        <Link to="/">
          <h2>Skill<span>Hub</span></h2>
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-item">
            Home
          </Link>
        </li>

        <li
          ref={dropdownRef}
          onClick={() => setOpen(!open)}
          className="menu-item nav-item"
        >
          Courses <span className="arrow">{open ? "▲" : "▼"}</span>
          {open && (
            <div className="dropdown glass-dropdown">
              <Link to="/courses" onClick={() => setOpen(false)}>
                All Courses
              </Link>
              <Link to="/add-course" onClick={() => setOpen(false)}>
                Add Course
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link to="/contact" className="nav-item">
            Contact
          </Link>
        </li>
      </ul>

      <button
        className="theme-btn"
        onClick={() => setDark(!dark)}
        aria-label="Toggle Theme"
      >
        {dark ? <FaSun className="icon-sun" /> : <FaMoon className="icon-moon" />}
      </button>
    </nav>
  );
}

export default Navbar;
