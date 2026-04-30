import "../howtoplay-card.css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

// Component that shows steps for how to play the quiz game
function HowToPlayCard({ title, text, video, step, totalSteps, onNext }) {
  const cardRef = useRef(null); // Reference to the card element for animations
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const el = cardRef.current;

    // Choosing only these elements for animation
    const content = el.querySelectorAll(".video-box, h2, p");

    // Animate the content when the step changes
    gsap.fromTo(
      content,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", stagger: 0.05 }
    );
  }, [step]); // Re-run the animation whenever the step changes

  function handleClick() {
    const el = cardRef.current;

    // Same elements for exit animation
    const content = el.querySelectorAll(".video-box, h2, p");

    // If it's the last step, navigate to the home page after the animation
    if (step === totalSteps - 1) {
      gsap.to(content, {
        opacity: 0,
        x: -80,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => navigate("/"), // navigate to home after the exit animation completes
      });
      return;
    }

    // Or else just animate to the next step
    gsap.to(content, {
      opacity: 0,
      x: -80,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.05,
      onComplete: onNext, // Update the step after the exit animation completes
    });
  }

  return (
    <div ref={cardRef} className="howTo-card">
      <h3>How to play</h3>

      <div className="video-box">
        <video
          key={video} // This is forcing the video to reload when the source changes
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
        {/* Render a dot for each step, and highlight the current step */}
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={index === step ? "dot active" : "dot"} // Highlight the current step
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