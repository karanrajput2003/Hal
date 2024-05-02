const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const multer = require("multer");
var spawn = require("child_process").spawn; 

const db = require("../models");
const Record = db.record;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/logout", controller.logout);

  app.post("/api/recorddata", controller.senddata);

  app.get("/api/getdata", controller.getdata);

  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  const fs = require('fs');
let response_py;

app.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    const audioData = req.file.buffer; // Uploaded audio file

    // Write the uploaded audio data to a file
    fs.writeFile("uploaded_audio.wav", req.file.buffer, async (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("File saved successfully");

        // Call the Python script using spawn
        const process = spawn("python3", ['app.py', "uploaded_audio.wav"]);

        // Listen for data events from the Python process
        process.stdout.on('data', (data) => {
          console.log("Data received from Python:", data.toString());
          response_py = data.toString();
          const myjson = JSON.parse(response_py);
          console.log(myjson.Data.text);

          // Save data to the database
          const dataRecord = new Record({
            email: req.body.email,
            message: myjson.Data.text,
            mdate: req.body.date
          });

          dataRecord.save((err, savedData) => {
            if (err) {
              console.error("Error saving data to the database:", err);
              res.status(500).json({ error: "Error saving data to the database" });
            } else {
              console.log("Data saved to the database:", savedData);
              res.status(200).json({ message: "Audio saved successfully" });
            }
          });
        });

        process.stderr.on('data', (data) => {
          console.error("Error from Python:", data.toString());
          res.status(500).json({ error: "Error from Python" });
        });

        // Wait for the Python process to exit
        process.on('exit', (code) => {
          console.log("Python process exited with code:", code);
        });
      }
    });
  } catch (error) {
    console.error("Error saving audio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/uploadquestion", upload.single("audio"), async (req, res) => {
  try {
    const audioData = req.file.buffer; // Uploaded audio file

    // Write the uploaded audio data to a file
    fs.writeFile("uploaded_audio.wav", req.file.buffer, async (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("File saved successfully");

        // Call the Python script using spawn
        const process = spawn("python3", ['app.py', "uploaded_audio.wav"]);

        // Listen for data events from the Python process
        process.stdout.on('data', (data) => {
          console.log("Data received from Python:", data.toString());
          const response_py = JSON.parse(data); // Assuming Python script sends valid JSON
          const hello = response_py.Data.text;
          console.log(hello);
          res.status(200).send({ hello }); // Sending response back to client
      

          // Save data to the database
          // const dataRecord = new Record({
          //   email: req.body.email,
          //   message: myjson.Data.text,
          //   mdate: req.body.date
          // });

          // dataRecord.save((err, savedData) => {
          //   if (err) {
          //     console.error("Error saving data to the database:", err);
          //     res.status(500).json({ error: "Error saving data to the database" });
          //   } else {
          //     console.log("Data saved to the database:", savedData);
          //     res.status(200).json({ message: "Audio saved successfully" });
          //   }
          // });
        });

        // process.stderr.on('data', (data) => {
        //   console.error("Error from Python:", data.toString());
        //   res.status(500).json({ error: "Error from Python" });
        // });

        // Wait for the Python process to exit
        process.on('exit', (code) => {
          console.log("Python process exited with code:", code);
        });
      }
    });
  } catch (error) {
    console.error("Error saving audio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/question", controller.question);

}
