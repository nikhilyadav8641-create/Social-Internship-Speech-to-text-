import { useEffect, useState } from "react";

function Dashboard({ profile, stats }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("practiceHistory");

    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const minutes = Math.floor(stats.minutes);

  const progressLevel =
    stats.words < 25
      ? "🌱 Beginner"
      : stats.words < 100
        ? "🌿 Growing"
        : "🌳 Advanced";

  return (
    <section className="dashboard-page">
      <div className="dashboard-card">
        <h1>📊 Parent Dashboard</h1>

        <div className="child-info">
          <div className="child-avatar">{profile.avatar}</div>

          <div>
            <h2>{profile.name || "Child"}</h2>

            <p>Level: {profile.level}</p>
          </div>
        </div>

        <div className="progress-grid">
          <div className="progress-box">
            <h2>{stats.words}</h2>

            <p>Words Spoken</p>
          </div>

          <div className="progress-box">
            <h2>{minutes}</h2>

            <p>Minutes Practiced</p>
          </div>

          <div className="progress-box">
            <h2>{stats.sessions}</h2>

            <p>Sessions</p>
          </div>
        </div>

        <div className="learning-status">
          <h2>Current Progress</h2>

          <h3>{progressLevel}</h3>

          <p>Keep practicing every day. Every voice is important 💙</p>
        </div>

        <div className="history">
          <h2>Practice History</h2>

          {history.length === 0 ? (
            <p>No practice data yet</p>
          ) : (
            history.map((item, index) => (
              <div className="history-item" key={index}>
                📅
                {item.date}
                &nbsp; ⭐{item.words}
                words
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
