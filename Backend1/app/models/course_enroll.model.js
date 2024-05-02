const mongoose = require("mongoose");

const Course_Enroll = mongoose.model(
  "Course_Enroll",
  new mongoose.Schema({
    email: String,
    username: String,
    course_id: String,
    course_author: String,
    course_name: String
  })
);

module.exports = Course_Enroll;
