import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import API from "../api/courseApi";
import { FaSearch, FaExclamationCircle } from "react-icons/fa";

function Home() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    try {
      const response = await API.get("/courses");
      setCourses(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load courses. Please make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  }

  // Filter logic based on search and category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    
    if (!categoryParam) return matchesSearch;

    const titleLower = course.title.toLowerCase();
    let matchesCategory = false;
    
    if (categoryParam === "frontend") {
      matchesCategory = ["react", "frontend", "css", "html", "javascript", "js", "design"].some(k => titleLower.includes(k));
    } else if (categoryParam === "backend") {
      matchesCategory = ["node", "backend", "express", "java", "python", "php", "c#", "dotnet"].some(k => titleLower.includes(k));
    } else if (categoryParam === "database") {
      matchesCategory = ["mongo", "db", "sql", "database", "postgres", "redis"].some(k => titleLower.includes(k));
    } else if (categoryParam === "cloud") {
      matchesCategory = ["cloud", "aws", "azure", "docker", "kubernetes", "devops", "deploy"].some(k => titleLower.includes(k));
    } else {
      matchesCategory = true;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Hero />

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          className="search"
          type="text"
          placeholder={categoryParam ? `Search in ${categoryParam}...` : "Search Course..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {categoryParam && (
          <span className="category-badge">
            Category: {categoryParam.toUpperCase()}
          </span>
        )}
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Fetching amazing courses...</p>
        </div>
      ) : error ? (
        <div className="error-card glass-card">
          <FaExclamationCircle className="error-icon" />
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={fetchCourses}>Retry</button>
        </div>
      ) : (
        <>
          <div className="section-title">
            <h3>{categoryParam ? `${categoryParam.toUpperCase()} Courses` : "Explore Courses"}</h3>
            <span className="count-badge">{filteredCourses.length} results</span>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="no-results glass-card">
              <p>No courses found matching your criteria. Try searching something else or add a new course!</p>
            </div>
          ) : (
            <div className="courses">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  title={course.title}
                  students={course.students}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
