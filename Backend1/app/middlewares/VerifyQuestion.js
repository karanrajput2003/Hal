const db = require("../models");
const Answer = db.answer;

const checkanswer = (req, res, next) => {
    // Username
    Answer.findOne({
      q_id: req.body.q_id,
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(404).send({ message: "Quiz Already Submitted" });
        return;
      }
    });
  };