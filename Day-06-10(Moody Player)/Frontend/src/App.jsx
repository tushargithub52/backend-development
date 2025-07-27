import { useState } from "react";
import FacialExpressionDetector from "./components/FacialExpressionDetector";
import RecommendedSongs from "./components/RecommendedSongs";

const App = () => {

  const [songs, setSongs] = useState([])

  return (
    <div className="min-h-screen flex bg-gray-900">
      <FacialExpressionDetector setSongs={setSongs} />
      <RecommendedSongs songs={songs} />
    </div>
  );
};

export default App;
