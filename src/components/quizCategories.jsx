import { useNavigate } from "react-router-dom";
import { useQuizParams } from "../lib/quizParams";
import CategoryGridItem from "./CategoryGridItem";

export default function QuizCategories({ catArray }) {
  const navigate = useNavigate();
  const { setCategory } = useQuizParams();

  const handleSelect = (category) => {
    setCategory(category);
    navigate("/quiz/selectDifficulty");
  };
  const handleBack = () => {
    navigate("/quiz/");
  }

  return(
    <div className="quizApp">
      <button className="back-btn" onClick={() => handleBack()}>{"<"}</button>
      {/* All Categories */}
      <div className="section-header">
        <h2 className="section-title">All Categories</h2>
      </div>

      <div className="grid">
        {catArray.map((category) => (
          <CategoryGridItem categoryArray={category} handleSelect={handleSelect} />
        ))}
      </div>

    </div>
  );
}