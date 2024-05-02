const mongoose = require("mongoose");

const Audio = mongoose.model(
  "Audio",
  new mongoose.Schema({
    audio: Buffer,
    email: Buffer,
    message: String,
    mdate: String
  })
);

module.exports = Audio;
