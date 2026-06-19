import { Link, useLocation } from "react-router-dom";
import { FaCode, FaServer, FaDatabase, FaCloud, FaHome, FaPlusCircle, FaEnvelope } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="glass-sidebar">
      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul className="sidebar-menu">
          <li>
            <Link to="/courses?category=frontend" className="sidebar-link">
              <FaCode className="sidebar-icon" /> <span>Frontend</span>
            </Link>
          </li>
          <li>
            <Link to="/courses?category=backend" className="sidebar-link">
              <FaServer className="sidebar-icon" /> <span>Backend</span>
            </Link>
          </li>
          <li>
            <Link to="/courses?category=database" className="sidebar-link">
              <FaDatabase className="sidebar-icon" /> <span>Database</span>
            </Link>
          </li>
          <li>
            <Link to="/courses?category=cloud" className="sidebar-link">
              <FaCloud className="sidebar-icon" /> <span>Cloud</span>
            </Link>
          </li>
        </ul>
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <h3>Quick Menu</h3>
        <ul className="sidebar-menu">
          <li>
            <Link to="/" className={`sidebar-link ${isActive("/") ? "active" : ""}`}>
              <FaHome className="sidebar-icon" /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/add-course" className={`sidebar-link ${isActive("/add-course") ? "active" : ""}`}>
              <FaPlusCircle className="sidebar-icon" /> <span>Add Course</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`sidebar-link ${isActive("/contact") ? "active" : ""}`}>
              <FaEnvelope className="sidebar-icon" /> <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
