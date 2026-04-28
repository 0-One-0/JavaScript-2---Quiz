import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuizParams } from "../lib/quizParams";

export default function DifficultyPage() {
  const [localDifficulty, setLocalDifficulty] = useState("");
  const navigate = useNavigate();
  const { setAmount, setDifficulty } = useQuizParams();

  const chooseDifficulty = (level) => {
    setDifficulty(level);
    setLocalDifficulty(level);
    if(level === "easy") {
      setAmount(5);
    }
    if(level === "medium") {
      setAmount(10);
    }
    if(level === "hard") {
      setAmount(20);
    }
  };

  const startQuiz = async () => {
    //if (!selectedDifficulty) return;
    navigate("/quiz/quizCard");
  };

  return (
    <div className="quizApp">
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
