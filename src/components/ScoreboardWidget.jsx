import "../ScoreboardWidget.css";

// Displays a scoreboard with players from the profiles table
function ScoreboardWidget({ title, players, currentUserId }) {
  return (
    <div className="scoreboardWidget">
      <h2 className="scoreboardTitle">{title}</h2>

      <div className="scoreboardList">
        {players.map((player, index) => {
          // Check if this row belongs to the logged-in user
          const isCurrentUser = player.id === currentUserId;

          // Check if player is ranked first
          const isFirst = index === 0;

          // Generate fallback avatar letter if user has no avatar image
          const avatarLetter = player.name?.charAt(0).toUpperCase() || "?";

          return (
            <div
              key={player.id}
              className={`scoreboardRow ${
                isCurrentUser ? "scoreboardRow--me" : ""
              }`}
            >
              <div className="scoreboardLeft">
                <span className="scoreboardRank">{player.rank}</span>

                <div className="scoreboardAvatarWrapper">
                  {isFirst && <span className="scoreboardCrown">👑</span>}

                  {player.avatar ?
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="scoreboardAvatar"
                    />
                  : <div className="scoreboardAvatar scoreboardAvatarFallback">
                      {avatarLetter}
                    </div>
                  }
                </div>

                <span className="scoreboardName">{player.name}</span>
              </div>

              <span className="scoreboardScore">{player.score ?? 0} pts</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScoreboardWidget;
