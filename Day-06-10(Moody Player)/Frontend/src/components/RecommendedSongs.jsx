import { useState, useRef, useEffect } from "react";

const RecommendedSongs = ({ songs }) => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    const currentAudio = audioRefs.current[index];

    if (!currentAudio) return;

    if (playingIndex === index) {
      currentAudio.pause();
      setPlayingIndex(null);
    } else {
      // Pause all other audios
      audioRefs.current.forEach((audio, i) => {
        if (audio && i !== index) audio.pause();
      });

      currentAudio.play();
      setPlayingIndex(index);
    }
  };

  useEffect(() => {
    // Pause audio when component unmounts
    return () => {
      audioRefs.current.forEach((audio) => audio?.pause());
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        🎶 Recommended Tracks
      </h2>

      <div className="space-y-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>

              <button
                onClick={() => handlePlayPause(index)}
                className="text-2xl text-indigo-400 hover:text-indigo-500 transition"
              >
                {playingIndex === index ? (
                  <i className="ri-pause-line"></i>
                ) : (
                  <i className="ri-play-circle-fill"></i>
                )}
              </button>
            </div>

            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={song.audio}
              controls
              className="w-full mt-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSongs;
