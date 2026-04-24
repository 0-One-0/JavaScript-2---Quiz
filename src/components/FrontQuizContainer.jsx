import RandomBtn from "./RandomQuizBtn";

export default function RandomQuizContainer ({setCategory}) {

  return (
    <div className="random-container">
      <RandomBtn setCategory={setCategory}/>
      

      <span className="random-text">
        <span className="text-blue">Play</span> some quizes to test your knowledge
      </span>
    </div>
  );
}