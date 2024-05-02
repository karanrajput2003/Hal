const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    course_name: String,
    course_description: String,
    course_author: String,
    course_duration: String,
    course_image: String,
  })
);

module.exports = Course;
