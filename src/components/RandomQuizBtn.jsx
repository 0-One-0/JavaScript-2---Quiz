import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export default function RandomBtn({ setCategory }) {
  const navigate = useNavigate();

  const handleSelect = (category) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setCategory(category);
        navigate("/quiz/selectDifficulty");
      },
    });
    tl.to(".header-div, .daily-div, .random-container", {
      scale: 0,
      opacity: 0,
      
      xPercent: "random([-50,50])",
      yPercent: 50,
      ease: "power2.inOut",
      stagger: {
        each: 0.08,
        amount: 1,
      }
    });
  };

  return (
    <div className="random-btn" onClick={() => handleSelect("0")}>
      <div className="random-title">Random Quiz</div>
      <div className="big-icon">🔀</div>
    </div>
  );
}
