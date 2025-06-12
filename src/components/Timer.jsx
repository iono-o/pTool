import React, { useState, useEffect, useRef } from "react";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";

/** component displays pomodoro timer with usable buttons*/
function Timer() {
  const workDuration = 25 * 60;
  const breakDuration = 3 * 60;

  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [countdown, setCountdown] = useState(workDuration);
  const intervalRef = useRef(null);
  // Time formatting
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const displayTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  useEffect(() => {
    if (isRunning && countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  // Switch between work/break when countdown hits 0
  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
      const nextMode = mode === "work" ? "break" : "work";
      const nextDuration = nextMode === "work" ? workDuration : breakDuration;
      setMode(nextMode);
      setCountdown(nextDuration);
      setIsRunning(true); // auto-continue next round
      alert("times up");
    }
  }, [countdown, mode]);

  // Handlers
  function startTimer() {
    setIsRunning(true);
  }
  function stopTimer() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }
  function resetTimer() {
    stopTimer();
    setMode("work");
    setCountdown(workDuration);
  }

  return (
    <div>
      <h1 className="timer">{displayTime}</h1>
      <h2>{mode === "work" ? "Time to work 😓" : "Have a break 😄"}</h2>
      <button className="custom-button green-button" onClick={startTimer}>
        <PlayCircleFilledWhiteSharpIcon />
      </button>
      <button className="custom-button red-button" onClick={stopTimer}>
        <StopCircleSharpIcon />
      </button>
      <button className="custom-button grey-button" onClick={resetTimer}>
        <RestartAltSharpIcon />
      </button>
    </div>
  );
}

export default Timer;
