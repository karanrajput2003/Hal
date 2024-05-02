import React, { useState } from 'react';

const RecordAudio = () => {
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
                    const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                    chunks = [];
                    setAudioURL(window.URL.createObjectURL(blob));
                }

                mediaRecorder.start();
            })
            .catch(error => {
                console.log('Following error has occurred: ', error);
            });
    }

    const stopRecording = () => {
        mediaRecorder.stop();
    }

    const downloadAudio = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = audioURL;
        downloadLink.setAttribute('download', 'audio');
        downloadLink.click();
    }

    return (
        <div>
            <button onClick={startRecording}>Record</button>
            <button onClick={stopRecording}>Stop</button>
            <button onClick={downloadAudio}>Download Audio</button>
            {audioURL && <audio controls src={audioURL} />}
        </div>
    );
}

export default RecordAudio;