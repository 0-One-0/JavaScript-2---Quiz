import "../profile-page.css";
import { useNavigate } from "react-router-dom";

// Render the main profile page layout
function ProfilePage() {
  const navigate = useNavigate();

  const user = {
    name: "",
    subtitle: "",
  };

  const avatarLetter = user.name.charAt(0).toUpperCase();

  // Placeholder
  const stats = {
    points: 1200,
    quizzes: 24,
    followers: 35,
  };

  // Placeholder
  const rivals = [
    { name: "Maan" },
    { name: "Marko" },
    { name: "Jonathan" },
    { name: "Vanessa" },
    { name: "Sinan" },
  ];

  function handleEditProfile() {
    navigate("/edit-profile");
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{avatarLetter}</span>
          </div>
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-subtitle">{user.subtitle}</p>

          <div className="profile-stats">
            <div className="stat">
              <p className="stat-value">{stats.points}</p>
              <p className="stat-label">Points</p>
            </div>

            <div className="stat">
              <p className="stat-value">{stats.quizzes}</p>
              <p className="stat-label">Quizzes</p>
            </div>

            <div className="stat">
              <p className="stat-value">{stats.followers}</p>
              <p className="stat-label">Followers</p>
            </div>
          </div>

          <div className="rivals-section">
            <h3 className="rivals-title">Rivals</h3>

            <div className="rivals-list">
              {rivals.map((rival, index) => {
                const letter = rival.name.charAt(0).toUpperCase();

                return (
                  <div className="rival" key={index}>
                    <div className="rival-avatar">{letter}</div>
                    <p className="rival-name">{rival.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="profile-actions">
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
