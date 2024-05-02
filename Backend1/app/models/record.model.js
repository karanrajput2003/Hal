const mongoose = require("mongoose");

const Record = mongoose.model(
  "Record",
  new mongoose.Schema({
    email: String,
    message: String,
    mdate: String
  })
);

module.exports = Record;
