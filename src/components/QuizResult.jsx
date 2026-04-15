import { useEffect, useState } from "react";
import "../QuizResult.css";
import trophy from "../assets/prize-icon.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

function QuizResult({ questionAmount, score }) {
  let testString = "You’re getting warm 🔥";

  let showAmount = 10;
  let tempScore = 6;
  const [showScore, setShowScore] = useState(0);

  // useEffect(() => {

  //   const timer = setInterval(() => {
  //     if(showScore < tempScore)
  //     setShowScore((prev) => prev + 1);
  //   }, 150);

  //   //Clean up when its done
  //   return () => clearInterval(timer);
  // });

  useGSAP(() =>{
    gsap.fromTo(".results-show-result",{
      opacity: 0,
      
    },{opacity: 1,
      
      duration: 0.6,
      ease: "power1.inOut"
    })

    gsap.from(".trophy", {
      opacity: 0.5,
      delay: 0.5,
      duration: 1.5,
      y: -200,
      ease: "bounce.out"
    })
  }, []);
  return (
    <section className="result-section">
      <div className="results-container">
        <div className="results-top">
          <span className="result-title">Result</span>
          <div className="close-container ">
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
            {showScore}/{showAmount}{" "}
          </div>
          <div className="results-text">{testString}</div>
        </div>
        <div className="results-info-continer">
          <span className="score-title">Your score</span>
          <div className="results-info">
            <div className="info-accuracy">
              <span className="info-titles">ACCURACY</span>
              <span className="results-show">%</span>
            </div>
            <div className="info-correct">
              <span className="info-titles">CORRECT ANSWERS</span>
              <span className="results-show"> {score}</span>
            </div>
            <div className="info-incorrect">
              <span className="info-titles">INCORRECT ANSWERS</span>
              <span className="results-show"> {score - questionAmount}</span>
            </div>
          </div>
        </div>
        <div className="navigation-continer">
          <button className="main-btn">Play Again</button>
          <span className="second-btn">Back to Home</span>
        </div>
      </div>
    </section>
  );
}

export default QuizResult;
