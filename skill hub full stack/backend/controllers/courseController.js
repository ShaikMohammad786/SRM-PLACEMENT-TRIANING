const Course = require("../models/Course");

// GET ALL COURSES (With Automatic Seeding if Empty)
const getCourses = async (req, res) => {
  try {
    let courses = await Course.find();
    
    // Seed default courses if database is empty so the app has data immediately
    if (courses.length === 0) {
      const seedCourses = [
        { title: "React JS Essentials", students: 1240 },
        { title: "Node JS Backend API Design", students: 850 },
        { title: "MongoDB Architecture & Development", students: 610 },
        { title: "AWS Cloud Practitioner Guide", students: 970 },
        { title: "Java Full Stack Masterclass", students: 1530 }
      ];
      await Course.insertMany(seedCourses);
      courses = await Course.find();
    }
    
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ADD COURSE
const addCourse = async (req, res) => {
  try {
    const course = await Course.create({
      title: req.body.title,
      students: req.body.students
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getCourses,
  addCourse
};
