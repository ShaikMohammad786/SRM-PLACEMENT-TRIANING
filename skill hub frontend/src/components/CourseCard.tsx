interface CourseCardProps {
  title: string;
  students: number;
}

function CourseCard({ title, students }: CourseCardProps) {
  return (
    <div className="card">
      <div className="card-icon">
        {title.includes("React")
          ? "⚛️"
          : title.includes("Java")
            ? "☕"
            : title.includes("MERN")
              ? "🔥"
              : title.includes("Node")
                ? "🟢"
                : title.includes("Mongo")
                  ? "🍃"
                  : title.includes("Spring")
                    ? "🌱"
                    : "📘"}
      </div>
      <h2>{title}</h2>
      <p className="student-count">
        <span className="student-icon">👥</span> {students.toLocaleString()}{" "}
        Students
      </p>
      <button className="card-btn">View Course →</button>
    </div>
  );
}

export default CourseCard;
