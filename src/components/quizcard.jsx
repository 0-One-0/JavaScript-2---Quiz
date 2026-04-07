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
];

function QuizCard() {
  const [index, setIndex] = useState(0);

  const [question, setQuestion] = useState(quizArray[index]);
  const [random, setRandom] = useState(() => Math.random());

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

  return (
    <div className="quiz-continer">
      <div className="quiz info">
        <span className="category-title"></span>
        <span className="progress">
          {" "}
          Question {index + 1}/{quizArray.length}
        </span>
      </div>
      <div className="question-continer">
        <h1>
          {question.question}
        </h1>
      </div>
      <div className="answer-continer">{content}</div>
      <button onClick={nextQuest}>Next</button>
    </div>
  );
}

export default QuizCard;
