import { useEffect, useState } from "react";

function Achievements({ stats }) {
  const [stars, setStars] = useState(0);

  const [badges, setBadges] = useState([]);

  useEffect(() => {
    calculateAchievements();
  }, [stats]);

  function calculateAchievements() {
    let newStars = 0;

    let newBadges = [];

    if (stats.words >= 5) {
      newStars += 1;

      newBadges.push({
        title: "First Words",
        icon: "⭐",
      });
    }

    if (stats.words >= 25) {
      newStars += 2;

      newBadges.push({
        title: "Word Explorer",
        icon: "🌈",
      });
    }

    if (stats.words >= 100) {
      newStars += 5;

      newBadges.push({
        title: "Speech Champion",
        icon: "🏆",
      });
    }

    if (stats.minutes >= 10) {
      newStars += 3;

      newBadges.push({
        title: "Practice Hero",
        icon: "🎤",
      });
    }

    setStars(newStars);

    setBadges(newBadges);

    localStorage.setItem(
      "achievements",

      JSON.stringify({
        stars: newStars,

        badges: newBadges,
      }),
    );
  }

  return (
    <section className="achievement-card">
      <h1>🏆 Achievements</h1>

      <div className="star-box">
        <h2>⭐ {stars}</h2>

        <p>Stars Earned</p>
      </div>

      <div className="badge-container">
        {badges.length === 0 ? (
          <p>Start speaking to unlock rewards 😊</p>
        ) : (
          badges.map((badge) => (
            <div className="badge" key={badge.title}>
              <span>{badge.icon}</span>

              <p>{badge.title}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Achievements;
