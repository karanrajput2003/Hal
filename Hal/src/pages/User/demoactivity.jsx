

import React, { useState } from 'react';
import axios from 'axios';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const apiKey = 'acd8f32dc1msh1b2d72587bd4c03p1895ccjsn3e097938d35d';

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const convertTextToSpeech = async () => {
    try {
      const response = await axios.get('https://deltapolyvoice-multilingual-free-text-to-speech-tts-api.p.rapidapi.com/text-to-speech', {
        params: {
          text: text,
          lang: 'en'
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'deltapolyvoice-multilingual-free-text-to-speech-tts-api.p.rapidapi.com'
        }
      });
      setAudioURL(response.data.audioURL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} placeholder="Enter text here"></textarea>
      <button onClick={convertTextToSpeech}>Convert to Speech</button>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default TextToSpeech;
