import { useState } from "react";
import HowToPlayCard from "../components/HowToPlayCard";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.mp4";
import video4 from "../assets/videos/video4.mp4";
import "../HowToPlay.css";

// Page that handles the "How to Play" section of the quiz
function HowToPlay() {
  const [currentStep, setCurrentStep] = useState(0); // State to keep track of the current step in the tutorial

  // Array of steps for the tutorial, each with a title, text and video
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
      text: "Choose your difficulty level. The number of questions depends on the difficulty you select.",
      video: video3,
    },
    {
      title: "Start Playing",
      text: "Answer the questions and try to get the highest score possible. Good luck!",
      video: video4,
    },
  ];

  // Function to handle moving to the next step in the tutorial
  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  const step = steps[currentStep]; // Get the current step data to pass to the HowToPlayCard component

  return (
    <main className="howTo-page">
      <HowToPlayCard
        title={step.title}
        text={step.text}
        video={step.video}
        step={currentStep} // Sends the current step index to the card for animation purposes
        totalSteps={steps.length} // total number of steps for the dots indicator
        onNext={handleNext} // function to call when the user clicks to go to the next step
      />
    </main>
  );
}

export default HowToPlay;