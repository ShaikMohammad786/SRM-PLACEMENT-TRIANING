import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/courseApi";
import { FaBookOpen, FaUserGraduate, FaSortAmountDown, FaSortAmountUp, FaFilter } from "react-icons/fa";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("students-desc"); // default sort by students count desc
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    setLoading(true);
    try {
      const response = await API.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setLoading(false);
    }
  }

  // Filter logic based on category param
  const getFilteredCourses = () => {
    if (!categoryParam) return courses;

    const titleLower = categoryParam.toLowerCase();
    return courses.filter((course) => {
      const courseTitleLower = course.title.toLowerCase();
      if (titleLower === "frontend") {
        return ["react", "frontend", "css", "html", "javascript", "js", "design"].some(k => courseTitleLower.includes(k));
      } else if (titleLower === "backend") {
        return ["node", "backend", "express", "java", "python", "php", "c#", "dotnet"].some(k => courseTitleLower.includes(k));
      } else if (titleLower === "database") {
        return ["mongo", "db", "sql", "database", "postgres", "redis"].some(k => courseTitleLower.includes(k));
      } else if (titleLower === "cloud") {
        return ["cloud", "aws", "azure", "docker", "kubernetes", "devops", "deploy"].some(k => courseTitleLower.includes(k));
      }
      return true;
    });
  };

  // Sort logic
  const getSortedCourses = (filteredList) => {
    const listCopy = [...filteredList];
    if (sortBy === "students-desc") {
      return listCopy.sort((a, b) => b.students - a.students);
    } else if (sortBy === "students-asc") {
      return listCopy.sort((a, b) => a.students - b.students);
    } else if (sortBy === "title-asc") {
      return listCopy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      return listCopy.sort((a, b) => b.title.localeCompare(a.title));
    }
    return listCopy;
  };

  const filtered = getFilteredCourses();
  const sortedAndFiltered = getSortedCourses(filtered);

  return (
    <div className="page-container glass-container">
      <div className="page-header">
        <h1>Available Courses</h1>
        <div className="header-meta">
          <span className="meta-item">
            <FaBookOpen /> Total Courses: <strong>{courses.length}</strong>
          </span>
          {categoryParam && (
            <span className="meta-item filter-tag">
              <FaFilter /> Category: <strong>{categoryParam.toUpperCase()}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="controls-row">
        <div className="sort-control">
          <label htmlFor="sort-select"><FaSortAmountDown /> Sort By: </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="custom-select"
          >
            <option value="students-desc">Students (High to Low)</option>
            <option value="students-asc">Students (Low to High)</option>
            <option value="title-asc">Alphabetical (A-Z)</option>
            <option value="title-desc">Alphabetical (Z-A)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading course catalogue...</p>
        </div>
      ) : sortedAndFiltered.length === 0 ? (
        <div className="no-results-list">
          <p>No courses found under this category.</p>
        </div>
      ) : (
        <div className="course-list">
          {sortedAndFiltered.map((course, idx) => (
            <div key={course._id || idx} className="course-item-row glass-card-flat">
              <div className="course-row-left">
                <span className="row-number">{(idx + 1).toString().padStart(2, "0")}</span>
                <span className="row-title">{course.title}</span>
              </div>
              <div className="course-row-right">
                <span className="row-students">
                  <FaUserGraduate /> {course.students.toLocaleString()} Students
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
