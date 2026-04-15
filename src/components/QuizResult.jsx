import "../QuizResult.css";

function QuizResult({ questionAmount, category, selectedDifficulty, score }) {

    let testString = "You’re getting warm 🔥";

  return (
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
        
        <div className="results-icon"></div>
        <div className="results-amount"> {score} / {questionAmount} </div>
        <div className="results-text">{testString}</div>

      </div>
      <div className="results-Info"> 
        <div className="info-accuracy"></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default QuizResult;
