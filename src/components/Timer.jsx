import { useEffect } from "react";

const CountdownTimer = ({
  setStopProgress,
  seconds,
  setSeconds,
  stopProgress,
}) => {
  // 60 sekunder som startvärde

  useEffect(() => {
    // Stoppa när vi når noll
    if (seconds <= 0) {
      setStopProgress(true);
      return;
    }

    const timer = setInterval(() => {
      if (stopProgress === false) {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, setStopProgress, setSeconds, stopProgress]);

  const displayMinutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return (
    <div className="timer">
      <svg
        width="15"
        height="18"
        viewBox="0 0 15 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0H5V1.66667H10V0ZM6.66667 10.8333H8.33333V5.83333H6.66667V10.8333ZM13.3542 5.32083L14.5417 4.13333C14.1833 3.70417 13.7917 3.3125 13.3625 2.95417L12.175 4.14167C10.848 3.07714 9.19707 2.49793 7.49583 2.5C3.35 2.5 0 5.85833 0 10C0 14.1417 3.35 17.5 7.49583 17.5C11.6417 17.5 15 14.1417 15 10C15 8.22917 14.3833 6.60417 13.3542 5.32083ZM7.5 15.8333C4.27917 15.8333 1.66667 13.2208 1.66667 10C1.66667 6.77917 4.27917 4.16667 7.5 4.16667C10.7208 4.16667 13.3333 6.77917 13.3333 10C13.3333 13.2208 10.7208 15.8333 7.5 15.8333Z"
          fill="white"
        />
      </svg>
      <span>
        {displayMinutes}:{displaySeconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
};


export default CountdownTimer;