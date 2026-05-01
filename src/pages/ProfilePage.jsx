import "../profile-page.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useParams } from "react-router-dom";
import RivalsList from "../components/RivalsList";
import FollowersList from "../components/FollowersList";

// Render the main profile page layout
function ProfilePage() {
  const navigate = useNavigate();

  // Get username from URL
  const { username } = useParams();

  // Store profile data from profiles table
  const [profile, setProfile] = useState(null);

  // Store currently logged-in Supabase user
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [rivals, setRivals] = useState([]);

  // Track if logged in useralready follows this profile.
  const [isFollowing, setIsFollowing] = useState(false);

  // Generate avatar letter from Supabase profile database
  const avatarLetter = profile?.username?.charAt(0).toUpperCase() || "?";

  // Store how many users follow this profile
  const [followersCount, setFollowersCount] = useState(0);

  // Toggle followers list visibility
  const [showFollowers, setShowFollowers] = useState(false);

  // Loading screen for followers
  const [followersLoading, setFollowersLoading] = useState(false);

  // Fetch profile data from profiles table
  useEffect(() => {
    async function fetchProfile() {
      // Get currently logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

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
      checkIfFollowing(user.id, data.id);
      fetchFollowersCount(data.id);
      fetchRivals(data.id);
    }

    fetchProfile();
  }, [username, navigate]);

  async function fetchRivals(userId) {
    const { data, error } = await supabase
      .from("followers")
      .select("following_id")
      .eq("follower_id", userId);

    if (error) {
      console.log(error.message);
      return;
    }

    const followingIds = data.map((follow) => follow.following_id);

    if (followingIds.length === 0) {
      setRivals([]);
      return;
    }

    const { data: rivalProfiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, points")
      .in("id", followingIds)
      .order("points", { ascending: false })
      .limit(10);

    if (profilesError) {
      console.log(profilesError.message);
      return;
    }

    setRivals(rivalProfiles);
  }

  async function checkIfFollowing(userId, profileId) {
    const { data, error } = await supabase
      .from("followers")
      .select("*")
      .eq("follower_id", userId)
      .eq("following_id", profileId)
      .maybeSingle();

    if (error) {
      console.log(error.message);
      return;
    }

    setIsFollowing(!!data);
  }

  async function fetchFollowersCount(profileId) {
    const { count, error } = await supabase
      .from("followers")
      .select("*", { count: "exact", head: true })
      .eq("following_id", profileId);

    if (error) {
      console.log(error.message);
      return;
    }

    setFollowersCount(count || 0);
  }

  function handleEditProfile() {
    navigate("/edit-profile");
  }

  async function handleFollow() {
    if (!loggedInUser || !profile) return;

    if (isFollowing) {
      const { error } = await supabase
        .from("followers")
        .delete()
        .eq("follower_id", loggedInUser.id)
        .eq("following_id", profile.id);

      if (error) {
        console.log(error.message);
        return;
      }

      setIsFollowing(false);
      fetchRivals(loggedInUser.id);
      return;
    }

    const { error } = await supabase.from("followers").insert({
      follower_id: loggedInUser.id,
      following_id: profile.id,
    });

    if (error) {
      console.log(error.message);
      return;
    }

    setIsFollowing(true);
    fetchRivals(loggedInUser.id);
  }

  const avatarUrl = profile?.avatar_url || "";

  const isOwnProfile = loggedInUser?.id === profile?.id;

  function handleToggleFollowers() {
    if (showFollowers) {
      setShowFollowers(false);
      return;
    }

    setFollowersLoading(true);

    setTimeout(() => {
      setShowFollowers(true);
      setFollowersLoading(false);
    }, 1000);
  }
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

            <div className="stat" onClick={handleToggleFollowers}>
              <p className="stat-value">{followersCount}</p>
              <p className="stat-label">Followers</p>
            </div>
          </div>

          <RivalsList rivals={rivals} />

          <div className="profile-actions">
            {isOwnProfile ?
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
            : <button
                className={`follower-btn ${isFollowing ? "unfollow-button" : ""}`}
                onClick={handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            }
          </div>
        </div>
      </div>

      {followersLoading && (
        <div className="followers-loading">
          <div className="followers-spinner"></div>
        </div>
      )}

      {showFollowers && profile && (
        <FollowersList
          profileId={profile.id}
          isOwnProfile={isOwnProfile}
          onFollowerRemoved={() => fetchFollowersCount(profile.id)}
        />
      )}
    </div>
  );
}

export default ProfilePage;
