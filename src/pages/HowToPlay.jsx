import { useState } from "react";
import HowToPlayCard from "../components/HowToPlayCard";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.mp4";
import video4 from "../assets/videos/video4.mp4";

function HowToPlay() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Start a Quiz",
      text: "Click on 'Quiz' to begin. This is where all quizzes are available.",
      video: video1,
    },
    {
      title: "Pick a Category",
      text: "Browse different categories and choose the quiz you want to play.",
      video: video2,
    },
    {
      title: "Select Difficulty",
      text: "Choose your difficulty level.",
      video: video3,
    },
    {
      title: "Start Playing",
      text: "Answer the questions and try to get the highest score possible.",
      video: video4,
    },
  ];

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  const step = steps[currentStep];

  return (
    <main className="how-page">
      <HowToPlayCard
        title={step.title}
        text={step.text}
        video={step.video}
        step={currentStep}
        totalSteps={steps.length}
        onNext={handleNext}
      />
    </main>
  );
}

export default HowToPlay;