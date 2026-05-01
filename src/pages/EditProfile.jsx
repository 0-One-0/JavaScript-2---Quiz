import "../edit-profile.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

// Handle edit profile page
function EditProfile() {
  // Store full profile from database
  const [profile, setProfile] = useState(null);

  // Store currently logged-in Supabase user
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Store selected avatar preview
  const [avatarPreview, setAvatarPreview] = useState("");

  // Track if avatar should be removed
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  // Store username input
  const [username, setUsername] = useState("");

  // Store bio input
  const [bio, setBio] = useState("");

  // Track if profile changes were saved
  const [success, setSuccess] = useState(false);

  // Loading state while saving profile
  const [loading, setLoading] = useState(false);

  // Initialize navigation
  const navigate = useNavigate();

  // Generate fallback avatar letter from username
  const avatarLetter = username.charAt(0).toUpperCase() || "?";

  // Fetch and load user profile data from profiles table
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error.message);
        return;
      }

      setProfile(profileData);
      setUsername(profileData.username || "");
      setAvatarPreview(profileData.avatar_url || "");
      setBio(profileData.bio || "");
    }

    fetchUser();
  }, []);

  // Upload avatar to Supabase Storage and show preview
  async function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      console.log("UPLOAD ERROR:", uploadError);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    setAvatarPreview(data.publicUrl);
    setAvatarRemoved(false);
  }

  // Remove avatar from Supabase Storage and reset preview
  async function handleRemoveAvatar() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.storage
      .from("avatars")
      .remove([
        `${user.id}.jpg`,
        `${user.id}.png`,
        `${user.id}.jpeg`,
        `${user.id}.webp`,
      ]);

    setAvatarPreview("");
    setAvatarRemoved(true);
  }

  // Save profile changes to profiles table
  async function handleSaveProfile(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !profile) {
      setLoading(false);
      return;
    }

    const updatedUsername = username.trim() || profile.username;
    const updatedBio = bio.trim() || profile.bio;
    const updatedAvatarUrl =
      avatarRemoved ? "" : avatarPreview || profile.avatar_url;

    const { error } = await supabase
      .from("profiles")
      .update({
        username: updatedUsername,
        bio: updatedBio,
        avatar_url: updatedAvatarUrl,
      })
      .eq("id", user.id);

    if (error) {
      console.log(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      navigate(`/profile/${updatedUsername}`);
    }, 1000);
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h1 className="edit-profile-title">Edit Profile</h1>

        <div className="edit-avatar">
          <div className="avatar-preview">
            {avatarPreview ?
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="avatar-image"
              />
            : <span>{avatarLetter}</span>}
          </div>

          <div className="avatar-upload">
            <label htmlFor="avatarInput" className="avatar-upload-btn">
              Change Avatar
            </label>

            {avatarPreview && (
              <button
                type="button"
                className="remove-avatar-btn"
                onClick={handleRemoveAvatar}
              >
                Remove
              </button>
            )}

            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="avatar-input-hidden"
            />
          </div>
        </div>

        <form className="edit-profile-form" onSubmit={handleSaveProfile}>
          <label htmlFor="username">Change Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Write something about yourself"
            rows="4"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          ></textarea>

          {success && <p className="success-text">Saved!</p>}

          <button type="submit" className="save-profile-btn" disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
