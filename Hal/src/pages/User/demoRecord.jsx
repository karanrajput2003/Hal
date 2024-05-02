import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/Student/StudentNavbar";
import { useLocation } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
// import multer  from 'multer';
// const upload = multer({ dest: 'uploads/' })

const RecordAudio = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("")
    const location = useLocation();
    const history = useNavigate();
    const date = new URLSearchParams(location.search).get("date");
    const playbackRef = useRef(null);
    const username = useSelector(state => state.username)
    const email = useSelector(state => state.email)


    const onSubmit = (data) => {
        console.log(data);
        // upload.single(data.audio); 
        console.log(data);
      };

    // function sendRequest(){

    // }
    // async function senddata() {

    //     if(transcription) {
    //   await axios.post('http://localhost:8080/api/recorddata', {
    //     email: email,
    //     message: transcription,
    //     mdate: date,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     alert("Message Saved Successfully")
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // }
    // else{
    //   alert("No Speech")
    // }
    // }

    const [transcription, setTranscription] = useState('');
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);

    const sendRequest = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/getdata", {
            params: {
              email: email,
              mdate: date,
              }
          });
      
          let data = res.data.course[0].message;
          console.log(data);
    
          setData(res.data.course[0]);
        } catch (err) {
          console.log(err);
        }
      };

    const [audioURL, setAudioURL] = useState('');
    let mediaRecorder, chunks = [];

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                }

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { 'type': 'audio/mp3; codecs=opus' });
                    chunks = [];
                    setAudioURL(window.URL.createObjectURL(blob));
                }

                mediaRecorder.start();
            })
            .catch(error => {
                console.log('Following error has occurred: ', error);
            });
        // setIsListening(true);

    }

    const stopRecording = () => {
        mediaRecorder.stop();
        console.log(audioURL);
        // setIsListening(false);
    }

    const downloadAudio = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = audioURL;
        downloadLink.setAttribute('download', 'audio');
        downloadLink.click();
    //     const pythonProcess = spawn('python3', ["app.py", audioURL]);
    //   pythonProcess.stdout.on('data', (data) => {
    //   console.log(data)
    //   console.log('Node JS got data ${data}');
    //   console.log('Type is : ${typeof data }');
    //   const mystr = data.toString();
    //   console.log('Data To String ${mystr} Type of ${typeof mystr}');
    //   console.log(mystr);
  
    //   const myjson = JSON.parse(mystr);
    //   console.log(myjson);

//   });
    }

    let a = "";
    for (let i = 0; i < date.length; i++) {
      if (date[i] == "-") {
        break;
      } else {
        a = a + date[i];
      }
    }
    let b = "";
    for (let i = 0; i < date.length; i++) {
      if (date[i] == "-") {
        b = b + " ";
      } else {
        b = b + date[i].toUpperCase();
      }
    }
  

    return (
        <div>
            <Navbar />
            <div className="w-full max-w-6xl px-4 mx-auto my-6">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card">
        <div>
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Date: {b}</h2>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <a
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800"
                  href="#"
                >
                  {a}
                </a>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-sm mx-auto"
            data-v0-t="card"
          >
            <div
              className="rounded-lg bg-card text-card-foreground  max-w-lg mx-auto"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6 text-center">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold tracking-tight">
                    Record your voice
                  </h2>
                  <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    Click the button and start speaking
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 p-8">
                <div className="flex items-center space-x-4">
    
                    <button class="mic-toggle" id="mic" onClick={startRecording} >
                    <span class="material-symbols-outlined">mic</span>
                  </button>
                  <button class="stop-toggle" id="stop" onClick={stopRecording} >
                  <span class="material-symbols-outlined">stop_circle</span>
                  </button>
                  <button class="stop-toggle" id="stop" onClick={stopRecording} >
            {audioURL && <audio controls src={audioURL} />}
                  </button>
                </div>
                <div className="flex items-center justify-center">
                <p id="result">{transcription}</p>  
                </div>
              </div>
              {audioURL &&
              <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data" >
                <input type='file' name="audiofile" {...register("audiofile")} />
                <p>{audioURL}</p>
                <button onClick={handleSubmit(onSubmit)} className="flex items-center border-t p-4 justify-center bg-indigo-600 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Save
    </button>
              </form>
              
                }
              <div className="flex items-center border-t p-4 justify-center">
        
      </div>
      
            </div>
          </div> 
          </div> 
            {/* <button onClick={startRecording}>Record</button>
            <button onClick={stopRecording}>Stop</button>
            <button onClick={downloadAudio}>Download Audio</button>
            {audioURL && <audio controls src={audioURL} />} */}
        </div>
        </div>
      </div>
    );
}

export default RecordAudio;