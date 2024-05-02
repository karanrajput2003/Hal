const mongoose = require("mongoose");

const Lesson = mongoose.model(
  "Lesson",
  new mongoose.Schema({
    lesson_name: String,
    lesson_description: String,
    lesson_video_link: String,
    course_id: String,
    course_name: String,
    course_author: String
  })
);

module.exports = Lesson;
