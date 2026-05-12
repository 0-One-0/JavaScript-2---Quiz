// Returns the correct CSS class based on the users answer.
// Shows correct answer in green always, wrong selection in red.
function getAnswerClass(answer, selectedAnswer, correctAnswer) {
  if (selectedAnswer === null) return "";
  if (answer === correctAnswer) return "correct";
  if (answer === selectedAnswer) return "wrong";
  return "";
}

// Renders the answer buttons in a randomized order.
function RandomAlign({ random, question, checkAns, selectedAnswer }) {
  const answers = [question.correct_answer, ...question.incorrect_answers];

  const sorted = [...answers].sort(() => random - 0.5);

  return (
    <ul className="ans-continer">
      {sorted.map((answer) => (
        <li
          key={answer}
          className={`options ${getAnswerClass(answer, selectedAnswer, question.correct_answer)}`}
          onClick={() => checkAns(answer)}
        >
          {answer}
        </li>
      ))}
    </ul>
  );
}

export default RandomAlign;
