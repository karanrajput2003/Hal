const mongoose = require("mongoose");

const Answer = mongoose.model(
  "Answer",
  new mongoose.Schema({
    email: String,
    q_id: String,
    lesson_id: String,
    course_id: String,
    selected_ans: String,
    correct_option: String
  })
);

module.exports = Answer;
