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
  const [answerd, setAnswerd] = useState(false);
  const [score, setScore] = useState(0);

  const checkAns = (e, answer) => {
    if (answerd === false) {
      if (question.correct_answer === answer) {
        e.target.classList.add("correct");
        setAnswerd(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setAnswerd(true);
        const answers = document.querySelectorAll(".options");
        answers.forEach((li) => {
          if (li.textContent === question.correct_answer) {
            li.classList.add("correct");
          }
        });
      }
    }
  };

  let content = RandomAlign(random, question, checkAns);

  const nextQuestion = () => {
    if (answerd === true) {
      if (index === quizArray.length - 1) {
        window.alert("You got " + score + " right ");
        return 0;
      }
      const answers = document.querySelectorAll(".options");
      answers.forEach((li) => {
        li.classList.remove("correct");
        li.classList.remove("wrong");
      });

      setIndex((prev) => prev + 1);
      setRandom(Math.random());
      setAnswerd(false);
    }
  };
  const skipQuestion = () => {
    if (answerd === true) {
      const answers = document.querySelectorAll(".options");
      answers.forEach((li) => {
        li.classList.remove("correct");
        li.classList.remove("wrong");
      });
    }
    if (index === quizArray.length - 1) {
      return 0;
    }
    setIndex((prev) => prev + 1);
    setRandom(Math.random());
    setAnswerd(false);
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
      { opacity: 1, duration: 0.8, ease: "power1.inOut" },
    );
    gsap.fromTo(
      ".options",
      {
        opacity: 0,
        y: -20,

        transformOrigin: "50% 50%",
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,

        duration: 0.8,
        ease: "power1.inOut",
      },
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
        <button className="submit-btn" onClick={nextQuestion}>
          Submit
        </button>
        <button
          className={`skip-btn ${answerd ? "hide" : "show"}`}
          onClick={skipQuestion}
        >
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

function RandomAlign(random, question, checkAns) {
  let content;
  if (random < 0.25) {
    content = (
      <ul className="ans-continer">
        <li
          onClick={(e) => {
            checkAns(e, question.correct_answer);
          }}
          className="options"
        >
          {question.correct_answer}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[0]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[1]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[2]}
        </li>
      </ul>
    );
  } else if (random < 0.5) {
    content = (
      <ul className="ans-continer">
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[0]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, question.correct_answer);
          }}
          className="options"
        >
          {question.correct_answer}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[1]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[2]}
        </li>
      </ul>
    );
  } else if (random < 0.75) {
    content = (
      <ul className="ans-continer">
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[0]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[1]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, question.correct_answer);
          }}
          className="options"
        >
          {question.correct_answer}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[2]}
        </li>
      </ul>
    );
  } else {
    content = (
      <ul className="ans-continer">
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[0]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[1]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, "");
          }}
          className="options"
        >
          {question.incorrect_answers[2]}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, question.correct_answer);
          }}
          className="options"
        >
          {question.correct_answer}
        </li>
      </ul>
    );
  }

  return content;
}

export default QuizCard;
