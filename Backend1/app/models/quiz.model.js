const mongoose = require("mongoose");

const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    lesson_id: String,
    course_id: String,
    question_name: String,
    option_A: String,
    option_B: String,
    option_C: String,
    option_D: String,
    correct_option: String
  })
);

module.exports = Quiz;
