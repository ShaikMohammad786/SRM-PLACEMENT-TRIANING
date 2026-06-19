import { FaUsers, FaReact, FaNodeJs, FaJava, FaDatabase, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

function CourseCard({ title, students }) {
  // Select matching course icon based on title keywords
  const getCourseIcon = (courseTitle) => {
    const name = courseTitle.toLowerCase();
    if (name.includes("react")) return <FaReact className="course-logo react-color" />;
    if (name.includes("node") || name.includes("mern") || name.includes("express")) return <FaNodeJs className="course-logo node-color" />;
    if (name.includes("java")) return <FaJava className="course-logo java-color" />;
    if (name.includes("database") || name.includes("mongo") || name.includes("sql")) return <FaDatabase className="course-logo db-color" />;
    return <FaCode className="course-logo default-color" />;
  };

  return (
    <motion.div
      className="card glass-card"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        {getCourseIcon(title)}
        <span className="badge">Featured</span>
      </div>

      <h2>{title}</h2>

      <div className="card-info">
        <FaUsers className="info-icon" />
        <span><strong>Students:</strong> {students}</span>
      </div>

      <button className="card-btn">
        View Course
      </button>
    </motion.div>
  );
}

export default CourseCard;
