import { Link } from "react-router-dom";

function RivalsList({ rivals }) {
  return (
    <div className="rivals-section">
      <h3 className="rivals-title">Rivals</h3>

      <div className="rivals-list">
        {rivals.length === 0 ?
          <p className="rivals-empty">No rivals yet</p>
        : rivals.map((rival) => {
            const letter = rival.username?.charAt(0).toUpperCase() || "?";

            return (
              <Link
                to={`/profile/${rival.username}`}
                className="rival"
                key={rival.id}
              >
                <div className="rival-avatar">
                  {rival.avatar_url ?
                    <img
                      src={rival.avatar_url}
                      alt={rival.username}
                      className="rival-avatar-image"
                    />
                  : letter}
                </div>

                <p className="rival-name">{rival.username}</p>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}

export default RivalsList;
