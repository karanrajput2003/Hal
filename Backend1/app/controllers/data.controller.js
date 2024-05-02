const db = require("../models");
const Course = db.course;
const Lesson = db.lesson;
const Course_Enroll = db.course_enroll;
const Answer = db.answer;
const Quiz = db.quiz;
const Role = db.role;
const multer  = require('multer')

//      Teacher Section
//Add Course
exports.addcourse = (req, res) => {
  const course = new Course({
    course_name: req.body.course_name,
    course_description: req.body.course_description,
    course_author: req.body.course_author,
    course_duration: req.body.course_duration,
    course_image: req.body.course_image,
  });

  let objectId;
  course.save((err, savedCourse) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    objectId = savedCourse._id.toString(); // Saving the ObjectId of the saved course


    const lesson = new Lesson({
      lesson_name: "Introduction",
      lesson_description: req.body.course_description,
      lesson_video_link: "https://www.youtube.com/embed/EHTWMpD6S_0?si=D1xqOETUBeJS6tvA",
      course_id: objectId,
      course_name: req.body.course_name,
      course_author: req.body.course_author
    });

    lesson.save((err, savedLesson) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "Course Added Successfully" });
    });
  });
};


//Get Course For Author
exports.getcourse = async (req, res) => {
  author = req.query.course_author;
  // console.log(author)
  let course;
  try {
    course = await Course.find({ course_author: author });
  } catch (error) {
    return new Error(error);
  }
  if (!course || course.length === 0) {
    return res.status(404).json({ message: "No course found for the given author." });
  }
  return res.status(200).json({ course  });
};

//Delete Course
exports.deletecourse = async (req, res) => {
    id = req.query.id;
    Course.findOneAndRemove(id, function (err, docs) { 
        if (err){ 
            return res.status(404).json({ message: "No course found for the given id." })
        } 
    }); 
    res.status(200).send({ message: "Course Deleted Succesfully" });
  };

//Add Lesson
exports.addlesson = (req, res) => {
  const lesson = new Lesson({
    lesson_name: req.body.lesson_name,
    lesson_description: req.body.lesson_description,
    lesson_video_link: req.body.lesson_video_link,
    course_id: req.body.course_id,
    course_name: req.body.course_name,
    course_author: req.body.course_author
  });

  lesson.save((err, course) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Lesson Added Succesfully" });
  });
};

  // Search Lesson With Author And Course Name
  exports.searchlesson = async (req, res) => {
    const searchAuthor = req.query.course_author;
    const searchName = req.query.course_name;
    try {
        let course;
        if (searchName) {
            course = await Lesson.find({ course_name: searchName,course_author: searchAuthor });
        } else {
            return res.status(400).json({ message: "Please provide a course author or course name." });
        } 


        if (!course || course.length === 0) {
            return res.status(404).json({ message: "No courses found." });
        }

        return res.status(200).json({ course });
    } catch (error) {
        console.error("Error searching lessons:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Add Quiz
exports.addquiz = (req, res) => {
  const quiz = new Quiz({
    lesson_id: req.body.lesson_id,
    course_id: req.body.course_id,
    question_name: req.body.question_name,
    option_A: req.body.option_A,
    option_B: req.body.option_B,
    option_C: req.body.option_C,
    option_D: req.body.option_D,
    correct_option: req.body.correct_option
  });

  quiz.save((err, course) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Quiz Added Succesfully" });
  });
};

// Get Quiz For a lesson
exports.getquiz = async (req, res) => {
  id = req.query.lesson_id;
  // console.log(author)
  let quiz;
  try {
    quiz = await Quiz.find({ lesson_id: id });
  } catch (error) {
    return new Error(error);
  }
  if (!quiz || quiz.length === 0) {
    return res.status(404).json({ message: "No quiz found for the given author." });
  }
  return res.status(200).json({ quiz  });
};


// Public Section
//Get Course For Author
exports.getallcourses = async (req, res) => {
  // console.log(author)
  let course;
  try {
    course = await Course.find();
  } catch (error) {
    return new Error(error);
  }
  if (!course || course.length === 0) {
    return res.status(404).json({ message: "No course found for the given author." });
  }
  return res.status(200).json({ course});
};


// Student Section
// Get Course And Lesson Details
exports.getcoursedetails = async (req, res) => {
  const { course_id } = req.query;
  console.log(course_id);
  let course;
  let lesson;
  try {
    course = await Course.find({_id: course_id});
    lesson = await Lesson.find({course_id: course_id});
  } catch (error) {
    return new Error(error);
  }
  if (!course || course.length === 0) {
    return res.status(404).json({ message: "No course found for the given author." });
  }
  return res.status(200).json({ course: course, lesson: lesson });
};

// Post Enroll Course Details
exports.enrollcourse = (req, res) => {
  const course_enroll = new Course_Enroll({
    email: req.body.email,
    username: req.body.username,
    course_id: req.body.course_id,
    course_author: req.body.course_author,
    course_name: req.body.course_name,
  });

  course_enroll.save((err, course_enroll) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Course Enroll Successfully " });
  });
};

// Get Course Details For Particular Course
exports.getenrollcoursedetails = async (req, res) => {
  const { email } = req.query;
  // console.log(email);
  let course;
  try {
    course = await Course_Enroll.find({email: email});
  } catch (error) {
    return new Error(error);
  }
  if (!course || course.length === 0) {
    return res.status(404).json({ message: "No course found for the given author." });
  }
  return res.status(200).json({course});
};

// Get Course Details To watch Course
exports.getcourseinfo = async (req, res) => {
  const { course_id } = req.query;
  let course, lesson;
  try {
    course = await Course.find({_id: course_id});
    lesson = await Lesson.find({course_id: course_id});

  } catch (error) {
    return new Error(error);
  }
  if (!course || course.length === 0) {
    return res.status(404).json({ message: "No course found for the given author." });
  }
  return res.status(200).json({course: course, lessons: lesson});
};

// Get Course Details To watch Course
exports.getlessoncontent = async (req, res) => {
  const { lesson_id } = req.query;
  let content;
  try {
    // course = await Course.find({_id: course_id});
    content = await Lesson.find({_id: lesson_id});

  } catch (error) {
    return new Error(error);
  }
  if (!content || content.length === 0) {
    return res.status(404).json({ message: "No lesson found for the given id." });
  }
  const courseId = content[0].course_id;
  try {
    lessonlist = await Lesson.find({course_id: courseId});

  } catch (error) {
    return new Error(error);
  }
  if (!lessonlist || lessonlist.length === 0) {
    return res.status(404).json({ message: "No lesson found for the given id." });
  }
  return res.status(200).json({lesson: content, lessonlist: lessonlist});
};

// Submit Quiz
exports.submitquiz = async (req, res) => {
  const answer = new Answer({
    email: req.body.email,
    q_id: req.body.q_id,
    question_name: req.body.question_name,
    lesson_id: req.body.lesson_id,
    course_id: req.body.course_id,
    selected_ans: req.body.selected_ans,
    correct_option: req.body.correct_option
  });

  answer.save((err, course) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Quiz Submitted Succesfully" });
  });
};