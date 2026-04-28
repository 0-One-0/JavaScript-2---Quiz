import { useNavigate } from "react-router-dom";
import { useQuizParams } from "../lib/quizParams";
import CategoryGridItem from "./CategoryGridItem";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function QuizCategories({ catArray }) {
  const navigate = useNavigate();
  const { setCategory } = useQuizParams();

  const handleSelect = (category) => {
    setCategory(category);
    navigate("/quiz/selectDifficulty");
  };
  const handleBack = () => {
    navigate("/quiz/");
  };
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".section-title", {
      opacity: 0,
      stagger: {
        each: 0.2,
      },
      ease: "power3.inOut",
    }).from(".grid", {
      opacity: 0,
      autoAlpha: 0,
      xPercent: "random([-50, 50])",
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div className="quizApp">
      <button className="back-btn" onClick={() => handleBack()}>
        {"<"}
      </button>
      {/* All Categories */}
      <div className="section-header">
        <h2 className="section-title">All Categories</h2>
      </div>

      <div className="grid">
        {catArray.map((category) => (
          <CategoryGridItem
            categoryArray={category}
            handleSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
