import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";

interface Course {
  title: string;
  students: number;
}

function Home() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses([
      { title: "React JS", students: 1000 },
      { title: "Java Programming", students: 800 },
      { title: "MERN Stack", students: 900 },
    ]);
  }, []);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Hero />

      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          className="search"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="courses">
        {filtered.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            students={course.students}
          />
        ))}
        {filtered.length === 0 && (
          <p className="no-results">No courses found matching "{search}"</p>
        )}
      </div>
    </>
  );
}

export default Home;
