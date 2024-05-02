const { verifySignUp }  = require("../middlewares");
const controller = require("../controllers/data.controller");

module.exports = function(app) {
  //    Teacher Routes
  //Add Course
  app.post(
    "/api/data/addcourse",
    controller.addcourse
  );
  

  //Get Course For Author
  app.get(
    "/api/data/getcourse",
    controller.getcourse
  );

  //Delete Course
  app.post(
    "/api/data/deletecourse",
    controller.deletecourse
  );

  //Add Lesson
  app.post(
    "/api/data/addlesson",
    controller.addlesson
  );

  //Search Course With Lesson
  app.get(
    "/api/data/searchlesson",
    controller.searchlesson
  );

  //Add Quiz
  app.post(
    "/api/data/addquiz",
    controller.addquiz
  );
  //Get All Quiz
  app.get(
    "/api/data/getquiz",
    controller.getquiz
  );


  // Public Routes
  app.get(
    "/api/data/getallcourses",
    controller.getallcourses
  );


  // Student Routes
  app.get(
    "/api/data/getcoursedetails",
    controller.getcoursedetails
  );
  app.post(
    "/api/data/enrollcourse",
    [
      verifySignUp.checkCourse
    ],
    controller.enrollcourse
  );
  app.get(
    "/api/data/enrollcourse",
    controller.getenrollcoursedetails
  );
  app.get(
    "/api/data/getcourseinfo",
    controller.getcourseinfo
  );
  app.get(
    "/api/data/getlessoncontent",
    controller.getlessoncontent
  );
  app.post(
    "/api/data/submitquiz",
    [
      verifySignUp.checkAnswer
    ],
    controller.submitquiz
  );


};
