import { useEffect, useState } from "react";
import "../QuizResult.css";
import trophy from "../assets/prize-icon.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

gsap.registerPlugin(useGSAP);

function QuizResult({ questionAmount, score, setReplay, setScore }) {
  function fireConfetti() {
    // left cannon aimed right
    confetti({
      particleCount: 150,
      angle: 60, 
      spread: 120,
      origin: { x: 0, y: 0 }, 
      gravity: 0.8, 
      drift: 0.5, 
      ticks: 400, 
      colors: ["#FF6BB5", "#00D4E8", "#FFD700", "#fff"],
    });

    // right cannon — angled inward to the left
    confetti({
      particleCount: 150,
      angle: 120, 
      spread: 120,
      origin: { x: 1, y: 0 },
      gravity: 0.8,
      drift: -0.5, 
      ticks: 400,
      colors: ["#FF6BB5", "#00D4E8", "#FFD700", "#fff"],
    });
  }
  const navigate = useNavigate();
  let response = "You’re getting warm 🔥";
  let respnseArray = [
    "Oof… that one hurt 😅 Try again?",
    "You’re getting warm 🔥",
    "You crushed that. Respect.",
  ];

  const [loaded, setLoaded] = useState(false);
  const [showScore, setShowScore] = useState(0);

  let procent = (score / questionAmount) * 100;
  if (isNaN(procent)) {
    procent = 0;
  }

  if (procent < 33) {
    response = respnseArray[0];
  } else if (procent < 66) {
    response = respnseArray[1];
  } else {
    response = respnseArray[2];
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (loaded === true) {
        if (showScore < score) {
          setShowScore((prev) => prev + 1);
        }
      }
    }, 100);

    //Clean up when its done
    return () => clearInterval(timer);
  }, [loaded, showScore, score]);
  const navBack = () => {
    setScore((prev) => prev - prev);
    setReplay(false);
    navigate("/Quiz/");
  };
  const playAgain = () => {
    setReplay(true);
    setScore((prev) => prev - prev);
    navigate("/Quiz/quizCard");
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaded(true),
    });

    tl.fromTo(
      ".results-show-result",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power1.inOut" },
    )
      .from(
        ".trophy",
        {
          opacity: 0.5,
          y: -200,
          duration: 0.8,
          ease: "bounce.out",
        },
        "+=0.5",
      )
      .from(
        ".results-text",
        {
          opacity: 0.5,
          y: 200,
          duration: 0.8,
          ease: "power1.out",
        },
        "-=1",
      )
      .from(
        ".results-amount",
        {
          opacity: 0,
          duration: 0.8,
          ease: "power1.out",
        },
        "<",
      )
      .to(
        ".results-info-continer",
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "+=0.5",
      )
      .call(() => {
        if (score === questionAmount) {
          fireConfetti();
        }
      });
  }, []);
  return (
    <section className="result-section">
      <div className="results-container">
        <div className="results-top">
          <span className="result-title">Result</span>
          <div onClick={navBack} className="close-container ">
            <svg
              className="Close-results"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="Menu / Close_LG">
                  {" "}
                  <path
                    id="Vector"
                    d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
        </div>
        <div className="results-show-result">
          <div className="results-icon">
            <img className="trophy" src={trophy} alt="" />
          </div>
          <div className="results-amount">
            {" "}
            {showScore}/{questionAmount}{" "}
          </div>
          <div className="results-text">{response}</div>
        </div>
        <div className="results-info-continer">
          <span className="score-title">Your score</span>
          <div className="results-info">
            <div className="info-accuracy">
              <span className="info-titles">ACCURACY</span>
              <span className="results-show">{procent}%</span>
            </div>
            <div className="info-correct">
              <span className="info-titles">CORRECT ANSWERS</span>
              <span className="results-show"> {score}</span>
            </div>
            <div className="info-incorrect">
              <span className="info-titles">INCORRECT ANSWERS</span>
              <span className="results-show"> {questionAmount - score}</span>
            </div>
          </div>
        </div>
        <div className="navigation-continer">
          <button onClick={playAgain} className="main-btn">
            Play Again
          </button>
          <span onClick={navBack} className="second-btn">
            Back to Home
          </span>
        </div>
      </div>
    </section>
  );
}

export default QuizResult;
