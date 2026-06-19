import { Link } from "react-router-dom";

function Sidebar() {
  const categories = [
    { name: "Frontend", icon: "🎨" },
    { name: "Backend", icon: "⚙️" },
    { name: "Database", icon: "🗄️" },
    { name: "Cloud", icon: "☁️" },
  ];

  return (
    <aside>
      <h3>Categories</h3>
      {categories.map((cat) => (
        <Link to="/courses" key={cat.name} className="sidebar-item">
          <span className="sidebar-icon">{cat.icon}</span>
          {cat.name}
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
