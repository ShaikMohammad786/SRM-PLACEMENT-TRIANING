import { useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { FaBook, FaUsers, FaPlusCircle } from "react-icons/fa";

function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    students: ""
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!course.title || !course.students) {
      toast.error("All fields are required");
      return;
    }

    if (parseInt(course.students, 10) < 0) {
      toast.error("Students count cannot be negative");
      return;
    }

    setSubmitting(true);
    try {
      await API.post("/courses", {
        title: course.title,
        students: parseInt(course.students, 10)
      });
      toast.success("Course added successfully!");
      setCourse({
        title: "",
        students: ""
      });
    } catch (error) {
      toast.error("Failed to add course. Please check backend connection.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-container glass-container add-course-page">
      <h1>Add New Course</h1>
      <p className="page-subtitle">Publish a new learning module to the SkillHub catalogue.</p>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="input-group">
          <label htmlFor="course-title-input">
            <FaBook className="input-icon" /> Course Title
          </label>
          <input
            id="course-title-input"
            type="text"
            placeholder="e.g. React JS Advanced Architecture"
            value={course.title}
            onChange={(e) =>
              setCourse({
                ...course,
                title: e.target.value
              })
            }
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="course-students-input">
            <FaUsers className="input-icon" /> Initial Students Count
          </label>
          <input
            id="course-students-input"
            type="number"
            min="0"
            placeholder="e.g. 1500"
            value={course.students}
            onChange={(e) =>
              setCourse({
                ...course,
                students: e.target.value
              })
            }
            required
          />
        </div>

        <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner-small"></span> Creating...
            </>
          ) : (
            <>
              <FaPlusCircle /> Add Course
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
