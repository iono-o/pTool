import React, { useRef, useState } from "react";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";

/** component displays usable button to play ambient noise*/
function AmbientPlayer() {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [icon, setIcon] = useState(<PlayCircleFilledWhiteSharpIcon />);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIcon(<StopCircleSharpIcon />);
    } else {
      audioRef.current.pause();
      setIcon(<PlayCircleFilledWhiteSharpIcon />);
    }
  };
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div>
      <button onClick={toggleAudio} className="custom-button green-button">
        Ambient {icon}
      </button>
      <audio id="whiteNoiseAudio" loop ref={audioRef}>
        <source src="/sounds/brown_noise.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div>
        <input
          id="volumeControl"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default AmbientPlayer;
