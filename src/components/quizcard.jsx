import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "../quizCard.css";

gsap.registerPlugin(useGSAP);

const quizArray = [
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question: 'What English word means to "think deeply"?',
    correct_answer: "Contemplate",
    incorrect_answers: ["Confiscate", "Constipate", "Condensate"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question: "What do the Dutch call their language?",
    correct_answer: "Nederlands",
    incorrect_answers: ["Dansk", "Deutsch", "Hollander"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Linus Pauling, one of the only winners of multiple Nobel Prizes, earned his Nobel Prizes in Chemistry and what?",
    correct_answer: "Peace",
    incorrect_answers: ["Physics", "Economics", "Physiology/Medicine"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Linus Pauling, one of the only winners of multiple Nobel Prizes, earned his Nobel Prizes in Chemistry and what?",
    correct_answer: "Peace",
    incorrect_answers: ["Physics", "Economics", "Physiology/Medicine"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Linus Pauling, one of the only winners of multiple Nobel Prizes, earned his Nobel Prizes in Chemistry and what?",
    correct_answer: "Peace",
    incorrect_answers: ["Physics", "Economics", "Physiology/Medicine"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Linus Pauling, one of the only winners of multiple Nobel Prizes, earned his Nobel Prizes in Chemistry and what?",
    correct_answer: "Peace",
    incorrect_answers: ["Physics", "Economics", "Physiology/Medicine"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Linus Pauling, one of the only winners of multiple Nobel Prizes, earned his Nobel Prizes in Chemistry and what?",
    correct_answer: "Peace",
    incorrect_answers: ["Physics", "Economics", "Physiology/Medicine"],
  },
];

function QuizCard() {
  const [index, setIndex] = useState(0);

  const [question, setQuestion] = useState(quizArray[index]);
  const [random, setRandom] = useState(() => Math.random());
  const [progress, setProgrss] = useState(
    ((index + 1) / quizArray.length) * 100 + "%",
  );
  let content = null;
  if (random < 0.25) {
    content = (
      <ul className="ans-continer">
        <li>{question.correct_answer}</li>
        <li>{question.incorrect_answers[0]}</li>
        <li>{question.incorrect_answers[1]}</li>
        <li>{question.incorrect_answers[2]}</li>
      </ul>
    );
  } else if (random < 0.5) {
    content = (
      <ul className="ans-continer">
        <li>{question.incorrect_answers[0]}</li>
        <li>{question.correct_answer}</li>
        <li>{question.incorrect_answers[1]}</li>
        <li>{question.incorrect_answers[2]}</li>
      </ul>
    );
  } else if (random < 0.75) {
    content = (
      <ul className="ans-continer">
        <li>{question.incorrect_answers[0]}</li>
        <li>{question.incorrect_answers[1]}</li>
        <li>{question.correct_answer}</li>
        <li>{question.incorrect_answers[2]}</li>
      </ul>
    );
  } else {
    content = (
      <ul className="ans-continer">
        <li>{question.incorrect_answers[0]}</li>
        <li>{question.incorrect_answers[1]}</li>
        <li>{question.incorrect_answers[2]}</li>
        <li>{question.correct_answer}</li>
      </ul>
    );
  }

  const nextQuest = () => {
    if (index === quizArray.length - 1) {
      return 0;
    }
    setIndex((prev) => prev + 1);
    setRandom(Math.random());
  };

  useEffect(() => {
    setQuestion(quizArray[index]);
  }, [index]);
  useEffect(() => {
    setProgrss(((index + 1) / quizArray.length) * 100 + "%");
  }, [index]);
  useGSAP(() => {
    gsap.to(".progressbar-indicator", {
      width: progress,
      duration: 0.6,
      ease: "power1.inOut",
    });
    gsap.fromTo(
      ".question",
      {
        opacity: 0,
      },
      { opacity: 1,
        duration: 0.8,
        ease: "power1.inOut"
       }
    );
  }, [progress]);

  return (
    <div className="quiz-continer">
      <div className="quiz info">
        <div className="topper">
          {" "}
          <div className="back"></div>{" "}
          <span className="category-title">{question.category}</span>{" "}
          <div className="timer-continer"></div>
        </div>
        <ProgressBar />
        <span className="progress-index">
          {" "}
          Question {index + 1}/{quizArray.length}
        </span>
      </div>
      <div className="question-continer">
        <h1 className="question">{question.question}</h1>
      </div>
      <div className="answer-continer">{content}</div>
      <div className="sub-continer">
        <button className="submit-btn" onClick={nextQuest}>
          Submit
        </button>
        <button className="skip-btn" onClick={nextQuest}>
          Skip this question
        </button>
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="progressbar-continer">
      <div className="progressbar-indicator"></div>
    </div>
  );
}

export default QuizCard;
