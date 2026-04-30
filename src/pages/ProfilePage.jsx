import "../profile-page.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useParams } from "react-router-dom";

// Render the main profile page layout
function ProfilePage() {
  const navigate = useNavigate();

  // Get username from URL
  const { username } = useParams();

  // Store profile data from profiles table
  const [profile, setProfile] = useState(null);

  // Store currently logged-in Supabase user
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Generate avatar letter from Supabase profile database
  const avatarLetter = profile?.username?.charAt(0).toUpperCase() || "?";

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

  // Fetch profile data from profiles table
  useEffect(() => {
    async function fetchProfile() {
      // Get currently logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedInUser(user);

      // Get profile data from profiles table by username in URL
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error) {
        console.error(error.message);
        return;
      }

      setProfile(data);
    }

    fetchProfile();
  }, [username]);

  function handleEditProfile() {
    navigate("/edit-profile");
  }

  const avatarUrl = profile?.avatar_url || "";

  const isOwnProfile = loggedInUser?.id === profile?.id;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {avatarUrl ?
              <img
                src={avatarUrl}
                alt="Profile avatar"
                className="profile-avatar-image"
              />
            : <span>{avatarLetter}</span>}
          </div>
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{profile?.username || "No username"}</h1>
          <p className="profile-subtitle">{profile?.bio || "No bio yet"}</p>

          <div className="profile-stats">
            <div className="stat">
              <p className="stat-value">{profile?.points ?? 0}</p>
              <p className="stat-label">Points</p>
            </div>

            <div className="stat">
              <p className="stat-value">{profile?.quizzes ?? 0}</p>
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
            {isOwnProfile && (
              <div className="profile-actions">
                <button
                  className="edit-profile-btn"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
