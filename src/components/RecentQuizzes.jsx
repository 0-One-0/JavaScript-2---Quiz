import { useNavigate } from "react-router-dom";
import { useQuizParams } from "../lib/quizParams";

export default function RecentQuizzes({catArr}) {
  const navigate = useNavigate();
  const { setCategory, setAmount, setDifficulty } = useQuizParams();

  const handleSelect = ({category, amount, difficulty}) => {
    setCategory(category);
    setAmount(amount);
    setDifficulty(difficulty);
    navigate("/Quiz/QuizCard");
  };

  return (
    <>
      <h2 className={JSON.parse(localStorage.getItem("recentQuizzes"))?.length > 0 ? "section-title" : "hidden"}>Recent Quiz</h2>
      <div className={JSON.parse(localStorage.getItem("recentQuizzes"))?.length > 0 ? "list" : "hidden"}>
        <div className="list-items">
          {JSON.parse(localStorage.getItem("recentQuizzes"))?.map((quizArray) => (
            <>
              <div className="list-item" key={quizArray.category} onClick={() => handleSelect(quizArray)}>{catArr.find((item) => item.id === quizArray.category)?.icon} {catArr.find((item) => item.id === quizArray.category)?.name} "{quizArray.difficulty}" <div>▶</div></div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}