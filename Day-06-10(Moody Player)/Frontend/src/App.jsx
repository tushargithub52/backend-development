import { useState } from "react";
import FacialExpressionDetector from "./components/FacialExpressionDetector";
import RecommendedSongs from "./components/RecommendedSongs";

const App = () => {

  const [songs, setSongs] = useState([])

  return (
    <>
      <FacialExpressionDetector setSongs={setSongs} />
      <RecommendedSongs songs={songs} />
    </>
  );
};

export default App;
