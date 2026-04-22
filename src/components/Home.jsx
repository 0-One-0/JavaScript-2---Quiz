import { FrontHeader } from "./FrontHeader";
import { FrontPageDaily } from "./FrontPageDaily";
import RandomQuizContainer from "./FrontQuizContainer";

export function Home({ setCategory }) {
  let title1 = "Daily inspiration";
  let content1 = (
    <p className="daily-content">
      "We must form a union.
      <br /> We must unify"
    </p>
  );
  let title2 = "Daily Score";
  let content2 = <p className="daily-content">420 points</p>;
  return (
    <>
      <div className="flex-div">
        <FrontHeader />
        <div className="daily-continer">
          <FrontPageDaily title={title1} content={content1} />
          <FrontPageDaily title={title2} content={content2} />
        </div>

        <RandomQuizContainer setCategory={setCategory} />
      </div>
    </>
  );
}
