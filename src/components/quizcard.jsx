import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "../quizCard.css";
import CountdownTimer from "./Timer";
import RandomAlign from "./Answers";

gsap.registerPlugin(useGSAP);

//Temp array for tesing and demo, api will be implemented. the object structure is same as api
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
  //All the useState are made here.
  const [index, setIndex] = useState(0); //this is for the index that we are on like what question.
  const [question, setQuestion] = useState(quizArray[index]); //the quiz questions
  const [random, setRandom] = useState(() => Math.random()); //Random number to make sure that we dont have the right answer on all the questions.
  const [progress, setProgrss] = useState(
    ((index + 1) / quizArray.length) * 100 + "%", //This is a useState for the progress bar, it updates with the index to giva a correct answer.
  );
  const [answerd, setAnswerd] = useState(false); //Looks the submit so that we dont leave without answering, diffrent for skip.
  const [score, setScore] = useState(0); //Keeps check of the correct answers from user.
  const [stopProgress, setStopProgress] = useState(false); //checks so we stop everything when the timer is done.
  const [seconds, setSeconds] = useState(60); //use to start the timer for every question

  //Checks if answer is correct or wrong, we then save score and change styles to show user. We altso lock so you can only guess ones
  const checkAns = (e, answer) => {
    if (answerd === false) {
      if (question.correct_answer === answer) {
        //Changes the color
        e.target.classList.add("correct");

        //Update relevent states
        setAnswerd(true);
        setStopProgress(true);
        setScore((prev) => prev + 1);
      } else {
        //Changes the color
        e.target.classList.add("wrong");

        //Update relevent states
        setAnswerd(true);
        setStopProgress(true);

        //Shows the right answer
        const answers = document.querySelectorAll(".options");
        answers.forEach((li) => {
          if (li.textContent === question.correct_answer) {
            li.classList.add("correct");
          }
        });
      }
    }
  };

  //function for the submit button, this only works if the user has made a guess.
  const nextQuestion = () => {
    //Makes sure the user made a guess before the btn does anything
    if (answerd === true) {
      //Makes sure there are answers left
      if (index === quizArray.length - 1) {
        //Shows user the score
        window.alert("You got " + score + " right ");
        return 0;
      }

      //Takes away the colors for the anwsers.
      const answers = document.querySelectorAll(".options");
      answers.forEach((li) => {
        li.classList.remove("correct");
        li.classList.remove("wrong");
      });

      //Update relevent useStates
      setIndex((prev) => prev + 1);
      setRandom(Math.random());
      setAnswerd(false);
      setStopProgress(false);
      setSeconds(60);
    }
  };

  //function to skip the question
  const skipQuestion = () => {
    //if the user anwred we just skip
    if (answerd === true) {
      const answers = document.querySelectorAll(".options");
      answers.forEach((li) => {
        li.classList.remove("correct");
        li.classList.remove("wrong");
      });
    }
    //makes sure that there is more questions so it doesnt crash
    if (index === quizArray.length - 1) {
      return 0;
    }

    //Update the states to be ready for the next question
    setIndex((prev) => prev + 1);
    setRandom(Math.random());
    setAnswerd(false);
    setStopProgress(false);
    setSeconds(60);
  };

  //When the timer goes out we show the user the right answer.
  useEffect(() => {
    //Checks if we are meant to stop with the state
    if (stopProgress === true) {
      setAnswerd(true);

      //Finds the  right answer and change color to green
      const answers = document.querySelectorAll(".options");
      answers.forEach((li) => {
        if (li.textContent === question.correct_answer) {
          li.classList.add("correct");
        }
      });
    }
  }, [stopProgress, question]); //We user stopProgress and question to make sure we look at this as an option when they change

  //Updates question when the index goes up.
  useEffect(() => {
    setQuestion(quizArray[index]);
  }, [index]);
  //Updates the progessbar state when index changes.
  useEffect(() => {
    setProgrss(((index + 1) / quizArray.length) * 100 + "%");
  }, [index]);

  //Gsap animations, it users progress as a dependense to to change the progressbar, animate question and alot of other stuff.
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

  //This returns the whole quizcard.
  return (
    <section className="quizcard-section">
      <div className="quiz-continer">
        <div className="quiz info">
          <div className="topper">
            <div className="back">
              {" "}
              <button className="back-btn">{"<"}</button>{" "}
            </div>
            <span className="category-title">{question.category}</span>{" "}
            <div className="timer-continer">
              <CountdownTimer
                setStopProgress={setStopProgress}
                seconds={seconds}
                setSeconds={setSeconds}
                stopProgress={stopProgress}
              />
            </div>
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
        <div className="answer-continer">
          <RandomAlign
            random={random}
            question={question}
            checkAns={checkAns}
          />
        </div>
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
    </section>
  );
}
//Component for the Progressbar.
function ProgressBar() {
  return (
    <div className="progressbar-continer">
      <div className="progressbar-indicator"></div>
    </div>
  );
}

export default QuizCard;
