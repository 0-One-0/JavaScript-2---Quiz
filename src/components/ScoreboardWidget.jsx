import "../ScoreboardWidget.css";

// Displays a scoreboard with players and highlights current user
function ScoreboardWidget({ title, players, currentUserId }) {
  return (
    // Widget title
    <div className="scoreboardWidget">
      <h2 className="scoreboardTitle">{title}</h2>

      {/* Player list */}
      <div className="scoreboardList">
        {players.map((player, index) => { 
          const isCurrentUser = player.id === currentUserId; // Check if this is the logged-in user
          const isFirst = index === 0; // Check if player is ranked first

          return (
            <div
              key={player.id}
              className={`scoreboardRow ${isCurrentUser ? "scoreboardRow--me" : ""}`}
            >
              <div className="scoreboardLeft">
                {/* Rank number */}
                <span className="scoreboardRank">{player.rank}</span>

                {/* Avatar with crown for first place */}
                <div className="scoreboardAvatarWrapper">
                  {isFirst && <span className="scoreboardCrown">👑</span>}

                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="scoreboardAvatar"
                  />
                </div>

                {/* Player name */}
                <span className="scoreboardName">{player.name}</span>
              </div>

              {/* Player score */}
              <span className="scoreboardScore">{player.score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScoreboardWidget;