function Courses() {
  const courseList = [
    { name: "React JS", icon: "⚛️", desc: "Build dynamic user interfaces" },
    { name: "Java Programming", icon: "☕", desc: "Enterprise-grade applications" },
    { name: "Node JS", icon: "🟢", desc: "Server-side JavaScript runtime" },
    { name: "MongoDB", icon: "🍃", desc: "NoSQL document database" },
    { name: "MERN Stack", icon: "🔥", desc: "Full-stack JavaScript development" },
    { name: "Spring Boot", icon: "🌱", desc: "Java microservices framework" },
  ];

  return (
    <div className="page-container">
      <h1>Our Courses</h1>

      <div className="course-grid">
        {courseList.map((course, index) => (
          <div key={index} className="course-item">
            <span className="course-item-icon">{course.icon}</span>
            <div>
              <strong>{course.name}</strong>
              <p className="course-desc">{course.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
