import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    console.log('ready');
    const ws = new WebSocket('ws://13.127.172.244:5000');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('data', data);
      if (data.progress !== undefined) {
        setUploadPercentage(data.progress);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      await axios.post('http://13.127.172.244:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 50) / (progressEvent.total ?? 1)
          );
          setUploadPercentage(percentCompleted);
        },
      });

      setMessage('Video uploaded successfully.');
    } catch (error) {
      setMessage('Error uploading video.');
    } finally {
      setUploadPercentage(0); // Reset or keep the progress bar as per your UI logic
    }
  };

  const handleUrlUpload = async () => {
    try {
      await axios.post(
        'http://13.127.172.244:5000/upload-from-url',
        { videoUrl },
        {
          onUploadProgress: (progressEvent) => {
            // This event will not be triggered for this type of request, progress is handled via WebSocket
          },
        }
      );
      // No immediate message setting here, as the progress and completion will be handled via WebSocket
    } catch (error) {
      console.error(error);
      setMessage('Error uploading video from URL.');
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload from File</button>
      </div>
      <div>
        <input
          type="text"
          value={videoUrl}
          onChange={handleUrlChange}
          placeholder="Enter video URL"
        />
        <button onClick={handleUrlUpload}>Upload from URL</button>
      </div>
      {uploadPercentage > 0 && (
        <div>
          <p>Upload Progress: {uploadPercentage}%</p>
          <progress value={uploadPercentage} max="100" />
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadVideo;
