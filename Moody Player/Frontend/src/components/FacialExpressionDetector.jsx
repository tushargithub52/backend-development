import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from 'axios'

const FacialExpressionDetector = ({setSongs}) => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");

  // Start webcam stream
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
  //load models
  const loadModels = async () => {
    const MODEL_URL = "/models";

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);

    startVideo();
  };

  // Load face-api.js models
  useEffect(() => {
    loadModels();
  }, []);

  // Detect face expressions continuously
  const detectExpression = async () => {
    if (
      videoRef.current &&
      videoRef.current.readyState === 4 // video is playing
    ) {
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections && detections.expressions) {
        const sorted = Object.entries(detections.expressions).sort(
          (a, b) => b[1] - a[1]
        );
        setExpression(`${sorted[0][0]}`);
        axios.get(`http://localhost:3000/songs?mood=${sorted[0][0]}`)
        .then((response) => {
          console.log(response.data)
          setSongs(response.data.songs)
        })
        .catch((err) => {
          console.log("API error: ", err)
        })
      } else {
        setExpression(`No Face detected`);
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Facial Expression Detector</h1>
      <div style={{ position: "relative", display: "inline-block", marginBottom: "10px" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="640"
          height="480"
          style={{ borderRadius: "12px" }}
        />
      </div>
      <button
        style={{ display: "block", margin: "auto", padding: "10px 16px", fontSize: "20px" }}
        onClick={detectExpression}
      >
        Start detecting mood
      </button>
      <h2 style={{ marginTop: "1rem" }}>Current mood: {expression}</h2>
    </div>
  );
};

export default FacialExpressionDetector;
