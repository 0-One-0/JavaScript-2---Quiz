import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "../css/quiz-card.css";
import CountdownTimer from "./Timer";
import RandomAlign from "./Answers";
import { fetchQuizQuestions } from "../lib/triviaApi";
import { SplitText } from "gsap/all";
import { useNavigate } from "react-router-dom";
import { useQuizParams } from "../lib/quizParams";

gsap.registerPlugin(useGSAP, SplitText);



function QuizCard({ setScore, quizArray, setQuizArray, replay }) {
  const navigate = useNavigate();
  const { amount, category, difficulty } = useQuizParams();
  //All the useState are made here.

  const [index, setIndex] = useState(0); 
  const [random, setRandom] = useState(() => Math.random()); 
  const [answerd, setAnswerd] = useState(false);
  const [stopProgress, setStopProgress] = useState(false); 
  const [seconds, setSeconds] = useState(60); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  //Uses veribals derived from index state to update when re-render.
  const question = quizArray[index];
  const progress = ((index + 1) / quizArray.length) * 100 + "%";

  //Handles the load, err and quiz states and
  // fetches the questions and
  // answers by calling the function
  const loadQuestions = async () => {
    setLoading(true); //Lets react know that we need some time and want to show the user that we are loading.
    setError(null); //Make sure we clear the previus error so that it doesnt lock the user in the error message.

    //We try to call the async function
    try {
      const data = await fetchQuizQuestions(amount, category, difficulty);
      setQuizArray(data);

      // Save quiz fetch params to local storage with a maximum of 3 objects.
      const newQuiz = {
        amount: amount,
        category: category,
        difficulty: difficulty,
      };
      const recentQuizzes =
        JSON.parse(localStorage.getItem("recentQuizzes")) || [];
      if (
        !recentQuizzes.some(
          (quiz) =>
            quiz.amount === amount &&
            quiz.category === category &&
            quiz.difficulty === difficulty,
        )
      ) {
        recentQuizzes.push(newQuiz);
        if (recentQuizzes.length > 3) {
          recentQuizzes.shift();
        }
        localStorage.setItem("recentQuizzes", JSON.stringify(recentQuizzes));
      }
    } catch (err) {
      //We return the error if it happens
      setError(err.message);
    } finally {
      //We allways change the loading state to show the result or error.
      setLoading(false);
    }
  };

   // Runs once on mount. If replay is true the questions are already in quizArray
  // so we skip the fetch and just stop the loading state.
  useEffect(() => {
    //Sets timer so we know that we har loading the questions, prevents a fetch error. Double fetch because in strikt mode.
    const timer = setTimeout(() => {
      if (!replay) {
        loadQuestions();
      } else {
        setLoading(false);
      }
    }, 2000); //Set timmer for 2 sec.

    return () => clearTimeout(timer); //takes away timer when we are done
  }, []);

  //Checks if answer is correct or wrong, we then save score and change styles to show user. We altso lock so you can only guess ones
  const checkAns = (answer) => {
    if (!answerd) {
      setSelectedAnswer(answer);
      setAnswerd(true);
      setStopProgress(true);

      if (question.correct_answer === answer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  // Moves to the next question. If it's the last question, navigates to results.
  // Only works if the user has answered — skipping uses skipQuestion instead.
  const nextQuestion = () => {
    if (answerd === true) {
      if (index === quizArray.length - 1) {
        navigate("/Quiz/quizResult");
        return 0;
      }

      setSelectedAnswer(null);

      //Update relevent useStates
      setIndex((prev) => prev + 1);
      setRandom(Math.random());
      setAnswerd(false);
      setStopProgress(false);
      setSeconds(60);
    }
  };
  // Resets the score and quiz array before navigating back to the home screen.
  const goBack = () => {
    setScore(0);
    setQuizArray([]);
    navigate("/Quiz/");
  };

    // Skips the current question without requiring an answer.
  // Does nothing if it's the last question to prevent an out of bounds.
  const skipQuestion = () => {
    
    if (index === quizArray.length - 1) {
      return 0;
    }

    //Update the states to be ready for the next question
    setIndex((prev) => prev + 1);
    setRandom(Math.random());
    setAnswerd(false);
    setStopProgress(false);
    setSeconds(60);
    setSelectedAnswer(null);
  };

  // When the timer runs out, show the correct answer.
  // The !answered check prevents overwriting the users selection
  // if they answered just as the timer hit zero.
  useEffect(() => {
    
    if (stopProgress === true && !answerd) {
      setAnswerd(true);
      setSelectedAnswer(question.correct_answer);
    }
  }, [stopProgress]); //We user stopProgress and question to make sure we look at this as an option when they change

   // Animates the progress bar, question and answers on each new question.
  // Also handles the loading animation while waiting for the API.
  useGSAP(() => {
    let split = SplitText.create(".loading", {
      type: "chars",
    });
    if (!loading && question) {
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
    } else {
      gsap.from(split.chars, {
        y: 3,
        delay: 0.1,
        yoyo: true,
        opacity: 0,
        repeat: -1,
        repeatDelay: 0.2,
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 0.2,
      });
    }
  }, [progress, loading, question]);

  //Check if the content has been loaded from the api before we show other stuff.
  if (loading || (!question && !error)) {
    return (
      //Shows loading... when we want the user to wait
      <section className="quizcard-section">
        <h1 className="loading">Loading Quiz....</h1>
      </section>
    );
  }
  if (error) {
    return (
      //Shows error if it happens with the api.
      <section className="quizcard-section">
        <h2 className="error">Error: {error}</h2>
      </section>
    );
  }
  //This returns the whole quizcard.
  return (
    <section className="quizcard-section">
      <div className="quiz-continer">
        <div className="quiz info">
          <div className="topper">
            <div className="back">
              {" "}
              <button onClick={goBack} className="back-btn">
                {"<"}
              </button>{" "}
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
            selectedAnswer={selectedAnswer}
          />
        </div>
        <div className="sub-continer">
          <button className="main-btn" onClick={nextQuestion}>
            Submit
          </button>
          <button
            //Checks if the user made a guess, if the user did they cant skip.
            className={`second-btn ${answerd ? "hide" : "show"}`}
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
    // Inner div width is controlled by GSAP via the progressbar-indicator class
    <div className="progressbar-continer">
      <div className="progressbar-indicator"></div>
    </div>
  );
}

export default QuizCard;
