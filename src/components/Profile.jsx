import { useEffect, useState } from "react";

function Profile({ profile, setProfile }) {
  const [saved, setSaved] = useState(false);

  const avatars = ["😊", "🧒", "👧", "🧑", "🦸", "🌈", "🐻", "🚀"];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    const oldProfile = localStorage.getItem("childProfile");

    if (oldProfile) {
      setProfile(JSON.parse(oldProfile));
    }
  }, []);

  function updateProfile(key, value) {
    setProfile({
      ...profile,

      [key]: value,
    });

    setSaved(false);
  }

  function saveProfile() {
    localStorage.setItem(
      "childProfile",

      JSON.stringify(profile),
    );

    setSaved(true);
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <h1>👋 Create Child Profile</h1>

        <p className="welcome">
          Welcome, {profile.name ? profile.name : "Friend"}
          {profile.avatar}
        </p>

        <label>Child Name</label>

        <input
          type="text"
          placeholder="Enter child name"
          value={profile.name}
          onChange={(e) => updateProfile("name", e.target.value)}
        />

        <label>Choose Avatar</label>

        <div className="avatar-grid">
          {avatars.map((item) => (
            <button
              key={item}
              className={profile.avatar === item ? "selected-avatar" : ""}
              onClick={() => updateProfile("avatar", item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label>Learning Level</label>

        <select
          value={profile.level}
          onChange={(e) => updateProfile("level", e.target.value)}
        >
          {levels.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>

        <button className="save-btn" onClick={saveProfile}>
          💾 Save Profile
        </button>

        {saved && <p className="saved">✅ Profile Saved!</p>}
      </div>
    </section>
  );
}

export default Profile;
