import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizParams } from "../lib/quizParams";

export default function SelectQuiz({ setCatArray }) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const { setCategory } = useQuizParams();

  const catArr = [
    { id: 9, name: "General Knowledge", icon: "💡" },
    { id: 10, name: "Entertainment: Books", icon: "📚" },
    { id: 11, name: "Entertainment: Film", icon: "🎥" },
    { id: 12, name: "Entertainment: Music", icon: "🎶" },
    { id: 13, name: "Entertainment: Musicals & Theatres", icon: "🎭" },
    { id: 14, name: "Entertainment: Television", icon: "📺" },
    { id: 15, name: "Entertainment: Video Games", icon: "🎮" },
    { id: 16, name: "Entertainment: Board Games", icon: "🎲" },
    { id: 17, name: "Science & Nature", icon: "🔬" },
    { id: 18, name: "Science: Computers", icon: "💻" },
    { id: 19, name: "Science: Mathematics", icon: "➗" },
    { id: 20, name: "Mythology", icon: "🏛️" },
    { id: 21, name: "Sports", icon: "🏀" },
    { id: 22, name: "Geography", icon: "🌍" },
    { id: 23, name: "History", icon: "📜" },
    { id: 24, name: "Politics", icon: "🗳️" },
    { id: 25, name: "Art", icon: "🎨" },
    { id: 26, name: "Celebrities", icon: "🌟" },
    { id: 27, name: "Animals", icon: "🐾" },
    { id: 28, name: "Vehicles", icon: "🚗" },
    { id: 29, name: "Entertainment: Comics", icon: "🦸" },
    { id: 30, name: "Science: Gadgets", icon: "🔧" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga", icon: "🎌" },
    { id: 32, name: "Entertainment: Cartoon & Animations", icon: "🖍️" }
  ]
  
  const handleSearch = (value) => {
    setInput(value);
    if(value === "") {
      setResults([]);
      return;
    }
    const search = value.toLowerCase();
    const categoryFilter = catArr.filter(searchCategory => searchCategory.name.toLowerCase().includes(search));
    setResults(categoryFilter);
  }

  const handleSelect = (category) => {
    setCategory(category);
    navigate("/quiz/selectDifficulty");
  };

  const moreCategories = () => {
    setCatArray(catArr);
    navigate("/quiz/categories");
  };

  return (
    <div className="quizApp">

      {/* Search */}
      <div className="search">
        <input type="text" value={input} onChange={(e) => handleSearch(e.target.value)} placeholder="Search topics or quizzes" />
      </div>
      <div className="results">
        {results.map((results) => (
          <div className="result" key={results.id} onClick={(e) => {e.stopPropagation(); handleSelect(results.id)}}>{results.icon} {results.name}</div>
        ))}
      </div>

      {/* Daily Challenge */}
      <h2 className="section-title">Daily Challenge</h2>
      <div className="horizontal-scroll">
        <div
          className="card gradient-pink"
          onClick={() => handleSelect("9")}
        >
          <div className="card-title">General Knowledge</div>
          <div className="card-icon">💡</div>
        </div>

        <div
          className="card gradient-green"
          onClick={() => handleSelect("12")}
        >
          <div className="card-title">Entertainment: Music</div>
          <div className="card-icon">🎵</div>
        </div>
      </div>

      {/* Recent Quiz */}
      <h2 className="section-title">Recent Quiz</h2>
      <div className="list">
        <div className="list-item">
          <div className="list-left">🎮 Entertainment: Video Games</div>
          <div>▶</div>
        </div>
        <div className="list-item">
          <div className="list-left">📜 History</div>
          <div>▶</div>
        </div>
        <div className="list-item">
          <div className="list-left">🔬 Science: Gadgets</div>
          <div>▶</div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="section-header">
        <h2 className="section-title">Featured Categories</h2>
        <button className="arrow-btn" onClick={() => moreCategories()}>▶</button>
      </div>

      <div className="grid">
        <div className="grid-item" onClick={() => handleSelect(catArr[12].id)}>{catArr[12].icon} {catArr[12].name}</div>
        <div className="grid-item" onClick={() => handleSelect(catArr[13].id)}>{catArr[13].icon} {catArr[13].name}</div>
        <div className="grid-item" onClick={() => handleSelect(catArr[16].id)}>{catArr[16].icon} {catArr[16].name}</div>
        <div className="grid-item" onClick={() => handleSelect(catArr[18].id)}>{catArr[18].icon} {catArr[18].name}</div>
      </div>

      {/* Random Quiz */}
      <div className="random" onClick={() => handleSelect("0")}>
        <div className="random-title">Random Quiz</div>
        <div className="big-icon">🔀</div>
      </div>
    </div>
  );
}