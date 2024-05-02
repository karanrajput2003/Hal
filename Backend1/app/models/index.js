const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.record = require("./record.model")
db.audio = require("./audio.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;