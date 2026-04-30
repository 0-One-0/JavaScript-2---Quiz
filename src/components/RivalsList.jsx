function RivalsList({ rivals }) {
  return (
    <div className="rivals-section">
      <h3 className="rivals-title">Rivals</h3>

      <div className="rivals-list">
        {rivals.map((rival) => {
          const letter = rival.username?.charAt(0).toUpperCase() || "?";

          return (
            <div className="rival" key={rival.id}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RivalsList;
