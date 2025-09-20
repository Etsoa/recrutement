import React, { useState, useEffect, useRef } from 'react';
import '../styles/Timer.css';

const Timer = ({ 
  duration = 15, // 15 secondes par défaut
  onTimeUp,
  onTick,
  autoStart = true
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          
          // Callback pour chaque tick
          if (onTick) {
            onTick(newTime);
          }
          
          // Temps écoulé
          if (newTime <= 0) {
            setIsRunning(false);
            if (onTimeUp) {
              onTimeUp();
            }
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, onTimeUp, onTick]);

  useEffect(() => {
    // Réinitialiser le timer si la durée change
    setTimeLeft(duration);
  }, [duration]);

  const formatTime = (seconds) => {
    return `${seconds}s`;
  };

  return (
    <div className="timer-simple">
      <div className="timer-icon">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
        </svg>
      </div>
      <span className="timer-text">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;