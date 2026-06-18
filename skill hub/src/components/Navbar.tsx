import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <nav>
      <Link to="/" className="nav-brand">
        <h2>
          <span className="brand-icon">⚡</span> SkillHub
        </h2>
      </Link>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li
          className="dropdown-trigger"
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          Courses <span className="dropdown-arrow">{open ? "▲" : "▼"}</span>
          {open && (
            <div className="dropdown">
              <Link to="/courses">
                <p>React</p>
              </Link>
              <Link to="/courses">
                <p>Java</p>
              </Link>
              <Link to="/courses">
                <p>Node JS</p>
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;
