import "../edit-profile.css";
import { useState } from "react";

// Handle edit profile page
function EditProfile() {
  // Store selected avatar preview
  const [avatarPreview, setAvatarPreview] = useState("");

  // Store username input
  const [username, setUsername] = useState("");

  // Generate fallback avatar letter from username
  const avatarLetter = username.charAt(0).toUpperCase() || "?";

  // Show a preview of the selected avatar image
  function handleAvatarChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAvatarPreview(imageUrl);
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

            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="avatar-input-hidden"
            />
          </div>
        </div>

        <form className="edit-profile-form">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Enter your username" />

          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Write something about yourself"
            rows="4"
          ></textarea>

          <button type="submit" className="save-profile-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
