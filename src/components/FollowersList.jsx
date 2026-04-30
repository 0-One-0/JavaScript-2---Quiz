import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

function FollowersList({ profileId, isOwnProfile, onFollowerRemoved }) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    async function fetchFollowers() {
      const { data, error } = await supabase
        .from("followers")
        .select("follower_id")
        .eq("following_id", profileId);

      if (error) {
        console.log(error.message);
        return;
      }

      const followerIds = data.map((follow) => follow.follower_id);

      if (followerIds.length === 0) {
        setFollowers([]);
        return;
      }

      const { data: followerProfiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, points")
        .in("id", followerIds)
        .order("points", { ascending: false });

      if (profilesError) {
        console.log(profilesError.message);
        return;
      }

      setFollowers(followerProfiles);
    }

    if (profileId) {
      fetchFollowers();
    }
  }, [profileId]);

  async function handleRemoveFollower(followerId) {
    console.log("Removing follower:", followerId, "from profile:", profileId);

    const { error } = await supabase
      .from("followers")
      .delete()
      .eq("follower_id", followerId)
      .eq("following_id", profileId);

    if (error) {
      console.log(error.message);
      return;
    }

    setFollowers((prevFollowers) =>
      prevFollowers.filter((follower) => follower.id !== followerId),
    );

    if (onFollowerRemoved) {
      onFollowerRemoved();
    }
  }

  return (
    <div className="followers-list-section">
      <h3 className="followers-list-title">Followers</h3>

      <div className="followers-list">
        {followers.length === 0 ?
          <p className="followers-empty">No followers yet</p>
        : followers.map((follower) => {
            const avatarLetter =
              follower.username?.charAt(0).toUpperCase() || "?";

            return (
              <div className="followers-row" key={follower.id}>
                <Link
                  to={`/profile/${follower.username}`}
                  className="followers-user"
                >
                  <div className="followers-avatar">
                    {follower.avatar_url ?
                      <img
                        src={follower.avatar_url}
                        alt={follower.username}
                        className="followers-avatar-image"
                      />
                    : <span>{avatarLetter}</span>}
                  </div>

                  <div className="followers-info">
                    <span className="followers-name">{follower.username}</span>
                    <span className="followers-subtext">
                      {follower.points ?? 0} pts
                    </span>
                  </div>
                </Link>

                {isOwnProfile && (
                  <button
                    className="followers-remove-btn"
                    onClick={() => handleRemoveFollower(follower.id)}
                  >
                    Ta bort
                  </button>
                )}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default FollowersList;
