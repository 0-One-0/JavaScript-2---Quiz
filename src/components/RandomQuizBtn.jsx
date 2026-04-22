import { useNavigate } from "react-router-dom";

export default function RandomBtn ({setCategory}) {
  const navigate = useNavigate();

  const handleSelect = (category) => {
    setCategory(category);
    navigate("/quiz/selectDifficulty");
  };

  return (
    <div className="random-btn" onClick={() => handleSelect("0")}>
        <div className="random-title">Random Quiz</div>
        <div className="big-icon">🔀</div>
    </div>
  );
}