import "../ScoreboardWidget.css";

function ScoreboardWidget({ title, players, currentUserId }) {
  return (
    <div className="scoreboardWidget">
      <h2 className="scoreboardTitle">{title}</h2>

      <div className="scoreboardList">
        {players.map((player, index) => {
          const isCurrentUser = player.id === currentUserId;
          const isFirst = index === 0;

          return (
            <div
              key={player.id}
              className={`scoreboardRow ${isCurrentUser ? "scoreboardRow--me" : ""}`}
            >
              <div className="scoreboardLeft">
                <span className="scoreboardRank">{player.rank}</span>

                <div className="scoreboardAvatarWrapper">
                  {isFirst && <span className="scoreboardCrown">👑</span>}

                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="scoreboardAvatar"
                  />
                </div>

                <span className="scoreboardName">{player.name}</span>
              </div>

              <span className="scoreboardScore">{player.score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScoreboardWidget;