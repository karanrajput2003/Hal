import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/Student/StudentNavbar";
import { useLocation } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';


const AudioRecorder = () => {
    const date = new URLSearchParams(location.search).get("date");
    const [audioURL, setAudioURL] = useState('');
    const username = useSelector(state => state.username)
    const email = useSelector(state => state.email)

    const [data, setData] = useState("")

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const audioRef = useRef();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      setRecordedChunks([...recordedChunks, e.data]);
    };
    recorder.start();
    setRecording(true);
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const saveRecording = async () => {
    const blob = new Blob(recordedChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');
    formData.append('email', email); 
    formData.append('date', date);  

    try {
      const response = await axios.post('http://localhost:8080/upload', formData
      , {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Recording saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving recording:', error);
    }

    setRecordedChunks([]);
  };

  
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

  useEffect(()=>{
    sendRequest();
  },[])

  return (
    <div>

            <Navbar />

        
            <div className="w-full max-w-6xl px-4 mx-auto my-6">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card">
            {data ? 
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
                    Your recorded voice
                  </h2>
                  {/* <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    Click the button and start speaking
                  </p> */}
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 p-8">
                <div className="flex items-center space-x-4">
                <p>{data.message}</p>

                    </div>
                <div className="flex items-center justify-center">
                {/* <button onClick={saveRecording} disabled={recordedChunks.length === 0} className="flex items-center border-t p-4 justify-center bg-indigo-600 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Save
                </button> */}
                </div>
              </div>
            
        
      
            </div>
          </div> 
          </div> 
            :
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
      
                      <button class="mic-toggle" id="mic" onClick={startRecording} disabled={recording} >
                      <span class="material-symbols-outlined">mic</span>
                    </button>
                    <button class="stop-toggle" id="stop" onClick={stopRecording} disabled={!recording} >
                    <span class="material-symbols-outlined">stop_circle</span>
                    </button>
                    {audioURL && <audio controls src={audioURL} />}
                  </div>
                  <div className="flex items-center justify-center">
                  <button onClick={saveRecording} disabled={recordedChunks.length === 0} className="flex items-center border-t p-4 justify-center bg-indigo-600 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Save
                  </button>
                  </div>
                </div>
              
          
        
              </div>
            </div> 
            </div> }
        </div>
      </div>
      </div>
 
  );
};

export default AudioRecorder;
