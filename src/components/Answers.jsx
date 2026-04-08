//Return a random order of the questions so that anwser has a different spot most of the time.
function RandomAlign({ random, question, checkAns }) {
  if (random < 0.25) {
    return (
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
    return (
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
    return (
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
    return (
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
}

export default RandomAlign;
