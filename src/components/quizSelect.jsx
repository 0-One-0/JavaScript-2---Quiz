import { useNavigate } from "react-router-dom";

export default function SelectQuiz({ setCategory }) {
  const navigate = useNavigate();

  const handleSelect = (category) => {
    setCategory(category);
    navigate("/quiz/selectDifficulty");
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="logo">🧠</div>
        <div>☰</div>
      </div>

      {/* Search */}
      <div className="search">
        <input placeholder="Search topics or quizzes" />
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
        <button className="arrow-btn">→</button>
      </div>

      <div className="grid">
        <div className="grid-item" onClick={() => handleSelect("12")}>
          🎶 Music
        </div>
        <div className="grid-item">🎨 Art</div>
        <div className="grid-item">🏀 Sport</div>
        <div className="grid-item">🌍 Geography</div>
      </div>

      {/* Random Quiz */}
      <div className="random" onClick={() => handleSelect("9")}>
        <div>Random Quiz</div>
        <div className="big-icon">🔀</div>
      </div>
    </div>
  );
}