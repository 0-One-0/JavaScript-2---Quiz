import { useNavigate } from "react-router-dom";
import { useQuizParams } from "../lib/quizParams";
import CategoryGridItem from "./CategoryGridItem";
import RandomBtn from "./RandomQuizBtn";
import SearchBar from "./SearchBar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import RecentQuizzes from "./RecentQuizzes";
import { categoryArray } from "../lib/categoryArray";

export default function SelectQuiz() {
  const navigate = useNavigate();
  const { setCategory } = useQuizParams();
  const catArr = categoryArray;

  const handleSelect = (category) => {
    setCategory(category);
    navigate("/quiz/selectDifficulty");
  };

  const moreCategories = () => {
    navigate("/quiz/categories");
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.set(".quizApp", {
      overflow: "hidden",
    })
    .from(".search, .section-title, .arrow-btn", {
      opacity: 0,
      stagger: {
        each: 0.2,
      },
      ease: "power3.inOut",
    }).from(".horizontal-scroll, .list, .grid, .random-btn", {
      opacity: 0,
      autoAlpha: 0,
      xPercent: "random([-50, 50])",
      stagger: {
        each: 0.2,
      },
      ease: "power3.inOut",
    }).set(".quizApp", {
      overflow: "visible",
    });
  }, []);

  return (
    <div className="quizApp">
      {/* Search */}
      <SearchBar
        searchArr={catArr}
        handleSelect={handleSelect}
        placeholderText="Search for a category"
      />

      {/* Daily Challenge */}
      <h2 className="section-title">Daily Challenge</h2>
      <div className="horizontal-scroll">
        <div className="card gradient-pink" onClick={() => handleSelect(9)}>
          <div className="card-title">General Knowledge</div>
          <div className="card-icon">💡</div>
        </div>

        <div className="card gradient-green" onClick={() => handleSelect(12)}>
          <div className="card-title">Entertainment: Music</div>
          <div className="card-icon">🎵</div>
        </div>
      </div>

      {/* Recent Quiz */}
      <RecentQuizzes catArr={catArr} />

      {/* Featured Categories */}
      <div className="section-header">
        <h2 className="section-title">Featured Categories</h2>
        <button className="arrow-btn" onClick={() => moreCategories()}>
          ▶
        </button>
      </div>

      <div className="grid">
        <CategoryGridItem
          categoryArray={catArr[12]}
          handleSelect={handleSelect}
        />
        <CategoryGridItem
          categoryArray={catArr[13]}
          handleSelect={handleSelect}
        />
        <CategoryGridItem
          categoryArray={catArr[16]}
          handleSelect={handleSelect}
        />
        <CategoryGridItem
          categoryArray={catArr[18]}
          handleSelect={handleSelect}
        />
      </div>

      {/* Random Quiz */}
      <RandomBtn />
    </div>
  );
}
