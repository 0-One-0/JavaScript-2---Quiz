import "../edit-profile.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// Handle edit profile page
function EditProfile() {
  // Store selected avatar preview
  const [avatarPreview, setAvatarPreview] = useState("");

  // Store username input
  const [username, setUsername] = useState("");

  // Store bio input
  const [bio, setBio] = useState("");

  // Track if profile changes were saved
  const [success, setSuccess] = useState(false);

  // Generate fallback avatar letter from username
  const avatarLetter = username.charAt(0).toUpperCase() || "?";

  // Fetch and load user profille data (username and avatar) from Supabase
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUsername(user.user_metadata?.display_name || "");
      setAvatarPreview(user.user_metadata?.avatar_url || "");
      setBio(user.user_metadata?.bio || "");
    }

    fetchUser();
  }, []);

  // Show a preview of the selected avatar image
  async function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAvatarPreview(imageUrl);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}.${fileExt}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error(error.message);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
    const avatarUrl = data.publicUrl;

    await supabase.auth.updateUser({
      data: {
        avatar_url: avatarUrl,
      },
    });

    setAvatarPreview(avatarUrl);
    console.log("Saved avatar:", avatarUrl);
  }

  // Remove avatar from Supabase and reset preview
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

    await supabase.auth.updateUser({
      data: {
        avatar_url: "",
      },
    });

    setAvatarPreview("");
  }

  // Save profile changes
  async function handleSaveProfile(event) {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.auth.updateUser({
      data: {
        display_name: username,
        bio: bio,
        avatar_url: user.user_metadata?.avatar_url || "",
      },
    });

    setSuccess(true);

    // 🔥 update UI direkt
    setUsername(username);

    console.log("Profile updated");
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

            <button
              type="button"
              className="remove-avatar-btn"
              onClick={handleRemoveAvatar}
            >
              Remove
            </button>

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
          <label htmlFor="username">Username</label>
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

          <button type="submit" className="save-profile-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
