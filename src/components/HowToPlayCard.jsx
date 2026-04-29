import "../howtoplay-card.css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

function HowToPlayCard({ title, text, video, step, totalSteps, onNext }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = cardRef.current;

    const content = el.querySelectorAll(".video-box, h2, p");

    gsap.fromTo(
      content,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", stagger: 0.05 }
    );
  }, [step]);

  function handleClick() {
    const el = cardRef.current;

    const content = el.querySelectorAll(".video-box, h2, p");

    if (step === totalSteps - 1) {
      gsap.to(content, {
        opacity: 0,
        x: -80,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => navigate("/"),
      });
      return;
    }

    gsap.to(content, {
      opacity: 0,
      x: -80,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.05,
      onComplete: onNext,
    });
  }

  return (
    <div ref={cardRef} className="howTo-card">
      <h3>How to play</h3>

      <div className="video-box">
        <video
          key={video}
          className="howTo-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <h2>{title}</h2>
      <p>{text}</p>

      <div className="dots">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={index === step ? "dot active" : "dot"}
          />
        ))}
      </div>

      <button onClick={handleClick}>
        {step === totalSteps - 1 ? "Done" : "Next"}
      </button>
    </div>
  );
}

export default HowToPlayCard;