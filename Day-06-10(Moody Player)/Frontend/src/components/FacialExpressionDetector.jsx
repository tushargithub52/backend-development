import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FacialExpressionDetector = ({ setSongs }) => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Webcam error:", err));
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    startVideo();
  };

  useEffect(() => {
    loadModels();
  }, []);

  const detectExpression = async () => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections?.expressions) {
        const sorted = Object.entries(detections.expressions).sort((a, b) => b[1] - a[1]);
        const mood = sorted[0][0];
        setExpression(mood);

        axios
          .get(`http://localhost:3000/songs?mood=${mood}`)
          .then((res) => setSongs(res.data.songs))
          .catch((err) => console.log("API error:", err));
      } else {
        setExpression("No Face Detected");
      }
    }
  };

  return (
    <div className="w-1/2 text-center py-10 text-white">
      <h1 className="text-4xl font-extrabold mb-6">🎭 Facial Expression Detector</h1>
      <div className="inline-block rounded-xl  shadow-lg border border-gray-600">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="rounded-xl"
        />
      </div>
      <button
        onClick={detectExpression}
        className="m-auto block mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-lg font-medium rounded-md"
      >
        Start Detecting Mood
      </button>
      <h2 className="mt-4 text-xl font-medium">
        Current Mood: <span className="text-green-400 font-bold">{expression}</span>
      </h2>
    </div>
  );
};

export default FacialExpressionDetector;
