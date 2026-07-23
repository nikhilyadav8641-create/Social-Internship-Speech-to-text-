import { useState } from "react";

function Header({ darkMode, setDarkMode, setPage, language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function navigate(page) {
    setPage(page);

    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="logo">🌈 SpeakEasy Kids</div>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <nav className={menuOpen ? "nav open" : "nav"}>
        <button onClick={() => navigate("home")}>🏠 Home</button>

        <button onClick={() => navigate("profile")}>👤 Profile</button>

        <button onClick={() => navigate("dashboard")}>📊 Dashboard</button>

        <button onClick={() => navigate("vocabulary")}>🖼 Words</button>

        <button onClick={() => navigate("games")}>🎮 Games</button>

        <button onClick={() => navigate("settings")}>⚙ Settings</button>
        <div className="language-box">
            <label>🌍 Language</label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en-US">English</option>

              <option value="hi-IN">Hindi</option>

              <option value="ta-IN">Tamil</option>

              <option value="te-IN">Telugu</option>
            </select>
          </div>
        <button className="btnLogin">Login</button>
      </nav>

      <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;