import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DifficultyPage({ setSelectedDifficulty, setQuestionAmount }) {
  const [localDifficulty, setLocalDifficulty] = useState("");
  const navigate = useNavigate();

  const chooseDifficulty = (level) => {
    setSelectedDifficulty(level);
    setLocalDifficulty(level);
    if(level === "easy") {
      setQuestionAmount(5);
    }
    if(level === "medium") {
      setQuestionAmount(10);
    }
    if(level === "hard") {
      setQuestionAmount(20);
    }
  };

  const startQuiz = async () => {
    //if (!selectedDifficulty) return;
    navigate("/quiz/quizCard");
  };

  return (
    <div className="app">
      <h2 className="section-title">Choose your difficulty</h2>

      <div className={`difficulty ${localDifficulty === "easy" ? "active" : ""}`} onClick={() => chooseDifficulty("easy")}>
        Easy (5 Questions)
      </div>
      <div className={`difficulty ${localDifficulty === "medium" ? "active" : ""}`} onClick={() => chooseDifficulty("medium")}>
        Medium (10 Questions)
      </div>
      <div className={`difficulty ${localDifficulty === "hard" ? "active" : ""}`} onClick={() => chooseDifficulty("hard")}>
        Hard (20 Questions)
      </div>

      <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}
