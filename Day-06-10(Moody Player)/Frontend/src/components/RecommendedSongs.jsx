import { useState } from "react";

const RecommendedSongs = ({ songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div>
      <h2>Recommended Tracks</h2>
      {songs.map((song, index) => (
        <div key={index}>
          <div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div>
            {isPlaying === index && (
              <audio
                src={song.audio}
                style={{
                  display: "none",
                }}
                autoPlay={isPlaying === index}
                controls
              ></audio>
            )}
            <button onClick={() => handlePlayPause(index)}>
              {isPlaying === index ? (
                <i className="ri-pause-line"></i>
              ) : (
                <i className="ri-play-circle-fill"></i>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedSongs;
