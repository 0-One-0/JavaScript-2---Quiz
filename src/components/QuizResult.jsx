import { useEffect, useState } from "react";
import "../QuizResult.css";
import trophy from "../assets/prize-icon.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP);

function QuizResult({ questionAmount, score, setReplay, setScore }) {
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
  if(isNaN(procent)){
    procent = 0;
  }

  if (procent < 33 ) {
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
  }, [loaded, showScore]);
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
    gsap.fromTo(
      ".results-show-result",
      {
        opacity: 0,
      },
      {
        opacity: 1,

        duration: 0.6,
        ease: "power1.inOut",
      },
    );

    gsap.from(".trophy", {
      opacity: 0.5,
      delay: 0.5,
      duration: 1.5,
      y: -200,
      ease: "bounce.out",
    });
    gsap.from(".results-text", {
      opacity: 0.5,
      delay: 1,
      duration: 0.8,
      y: 200,
      ease: "power1.out",
    });

    gsap.from(".results-amount", {
      opacity: 0,
      delay: 1,
      duration: 0.8,
      ease: "power1.out",
      onComplete: () => {
        setLoaded(true);
      },
    });
  }, []);

  useGSAP(() => {
    if (loaded) {
      gsap.to(".results-info-continer", {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [loaded]);
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
              <span className="results-show">
                {procent}%
              </span>
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
          <button onClick={playAgain} className="main-btn">Play Again</button>
          <span onClick={navBack} className="second-btn">Back to Home</span>
        </div>
      </div>
    </section>
  );
}

export default QuizResult;
