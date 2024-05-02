import React, { useState } from 'react'
// import { GoogleGenerativeAI } from '@google/generative-ai';
import { useEffect } from 'react';
// const genAI = new GoogleGenerativeAI("AIzaSyCFh4i4y0sZptBifH-yjuH-y_w5m86FIiE");
import axios from 'axios';
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom'


function Questions() {
    const date = new URLSearchParams(location.search).get("data");
    const [audioURL, setAudioURL] = useState('');
    const [send, setSend] = useState('');

  const [data, setData] = useState("")
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);


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

    try {
      const response = await axios.post('http://localhost:8080/uploadquestion', formData
      , {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Recording saved successfully:', response.data);
      setSend(response.data.hello)
    } catch (error) {
      console.error('Error saving recording:', error);
    }

    setRecordedChunks([]);
  };


  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/question", {
        params: {
          question: 'assume you are a therapist and you are getting the same traumatised person to continue to open up'+'the person replies to your question'+'this'+ date +'you need to help her and continue the conversation while most importantly keeping the conversation engaging (just return the question and nothing filler), in hindi'
        // question: 'assume you are a therapist and you are getting the same traumatised person to continue to open up'+'the person replies to your question'+'this'+'you need to help her and continue the conversation while most importantly keeping the conversation engaging (just return the question and nothing filler), in hindi'
        
    }
      });
  
      let data = res;
      console.log(res.data.text);
  
      setData(res.data.text);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(()=>{
    sendRequest();
  },[])


  return (
    <>
       <div className="mx-10 rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-lg" data-v0-t="card">
  <div className="p-1 items-center">
    <div className="flex flex-col h-96 border-t border-b border-gray-200 dark:border-gray-800">
      <div className="flex-1 flex flex-col justify-end p-6">
        <div className="rounded-lg bg-gray-100 dark:bg-gray-900">
          <div className="p-4">
            <p className="text-sm font-medium">
              {data ? data : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="grid gap-4 p-6">
      <div className="grid gap-1">
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
      <div className="grid gap-2 text-sm">
      <p>आप मेरे साथ सुरक्षित महसूस कर सकते हैं. मैं आपको सुनने और आपका समर्थन करने के लिए यहां हूं।</p>
        <p>जब आप तैयार हों, तो सबमिट बटन पर क्लिक करें।</p>
      </div>
      <Link to={`/user/chat3?data=${send}`}  className="bg-indigo-600 text-white p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
        Submit
      </Link >
    </div>
  </div>
</div>
    </>
  )
}

export default Questions