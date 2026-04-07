import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(quizArray[index]);

  return (
    <div className="quiz-continer">
      <div className="quiz info">
        <span className="category-title"></span>
        <span className="progress"></span>
      </div>
      <div className="question-continer">
        <h1>{index + 1}. {question.question}</h1>
      </div>
      <div className="answer-continer">
        <ul>
          <li>{question.incorrect_answers[0]}</li>
          <li>{question.incorrect_answers[1]}</li>
          <li>{question.incorrect_answers[2]}</li>
          <li>{question.correct_answer}</li>
        </ul>
      </div>
      <button>Next</button>
    </div>
  );
}



export default QuizCard;
