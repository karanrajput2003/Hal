// const express = require("express");
// const cors = require("cors");
// require('dotenv').config();
// const dbConfig = require("./app/config/db.config");


// const app = express();

// var corsOptions = {
//   credentials: true,
//   origin: "http://localhost:5173"
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(express.json());



// const db = require("./app/models");
// const Role = db.role;

// // mongoose.connect("mongodb+srv://karan_admin:Kar2003@cluster0.oq0g1g1.mongodb.net/userDB", {useNewUrlParser: true});

// db.mongoose
//   .connect(`mongodb+srv://karan_admin:${process.env.MONGO_PASSWORD}@cluster0.oq0g1g1.mongodb.net/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to application." });
// });

// // routes
// require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);
// require("./app/routes/data.routes")(app);

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }



const axios = require('axios');
const fs = require('fs');

// API endpoint configuration
const api_url = "https://transcribe.whisperapi.com";
const api_key = "ZDUHZVZG5KUCDLJ7PWRTF8HAB9URN93U";

// Path to the audio file
const file_path = "output.wav";

// Payload setup for API request
const payload = {
    file: fs.createReadStream(file_path),
    data: {
        fileType: "YOUR_FILE_TYPE",  // Default is 'wav'.
        diarization: "false",         // 'True' may slow down processing.
        numSpeakers: "2",             // Optional: Number of speakers for diarization. If blank, model will auto-detect.
        // url: "URL_OF_STORED_AUDIO_FILE",  // Use either URL or file, not both.
        initialPrompt: "",            // Optional: Teach model a phrase. May negatively impact results.
        language: "en",               // Optional: Language of speech. If blank, model will auto-detect.
        task: "transcribe",           // Use 'translate' to translate speech from language to English. Transcribe is default.
        callbackURL: "",              // Optional: Callback URL for results to be sent.
    }
};

// Ensure the 'callbackURL' starts with 'https://' and does not include 'www.'
// The server calls the callback URL once the response is ready.

// Make the API request
axios.post(api_url, payload.file, {
    headers: {
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'audio/wav' // Adjust content type according to your file type
    },
    params: payload.data
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});


const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/audio_db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schema for audio files
const audioSchema = new mongoose.Schema({
  audio: Buffer,
});

const AudioModel = mongoose.model('Audio', audioSchema);

// Multer configuration for storing audio files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for uploading audio files
app.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const audioData = req.file.buffer; // Uploaded audio file
    const audio = new AudioModel({ audio: audioData });
    await audio.save();
    res.status(200).json({ message: 'Audio saved successfully' });
  } catch (error) {
    console.error('Error saving audio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
