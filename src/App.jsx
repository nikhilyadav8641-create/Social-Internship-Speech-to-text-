import { useState } from "react";

import Header from "./components/Header";

import Microphone from "./components/Microphone";
import Transcript from "./components/Transcript";
import Controls from "./components/Controls";
import Stats from "./components/Stats";

import Profile from "./components/Profile";
import Accessibility from "./components/Accessibility";
import Vocabulary from "./components/Vocabulary";
import Achievements from "./components/Achievements";
import Dashboard from "./components/Dashboard";
import Games from "./components/Games";
import SpeechFeedback from "./components/SpeechFeedback";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [text, setText] = useState("");

  const [language, setLanguage] = useState("en-US");

  const [darkMode, setDarkMode] = useState(false);

  const [recordingTime, setRecordingTime] = useState(0);

  const [settings, setSettings] = useState({
    largeText: false,

    highContrast: false,

    reduceAnimation: false,

    dyslexiaFont: false,
  });

  const [profile, setProfile] = useState({
    name: "",

    avatar: "😊",

    level: "Beginner",
  });

  const [stats, setStats] = useState({
    words: 0,

    sessions: 0,

    minutes: 0,
  });

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div
      className={`
app
${darkMode ? "dark" : ""}
${settings.largeText ? "large" : ""}
${settings.highContrast ? "high-contrast" : ""}
${settings.dyslexiaFont ? "dyslexia-font" : ""}
${settings.reduceAnimation ? "reduce-animation" : ""}
`}
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setPage={setPage}
        language={language}
        setLanguage={setLanguage}
      />

      {page === "home" && (
        <main className={settings.largeText ? "container large" : "container"}>
          <section className="hero">
            <h1>🌈 SpeakEasy Kids</h1>

            <p>Helping every child communicate with confidence</p>
          </section>

          <div className="mic-transcript-row">
            <Microphone
              text={text}
              setText={setText}
              language={language}
              recordingTime={recordingTime}
              setRecordingTime={setRecordingTime}
              setStats={setStats}
            />

            <Transcript text={text} setText={setText} />
          </div>

          <SpeechFeedback text={text} language={language} />

          <Controls text={text} setText={setText} language={language} />

          <Stats words={words} characters={text.length} time={recordingTime} />

          <Achievements stats={stats} />
        </main>
      )}

      {page === "profile" && (
        <Profile profile={profile} setProfile={setProfile} />
      )}

      {page === "dashboard" && <Dashboard profile={profile} stats={stats} />}

      {page === "vocabulary" && <Vocabulary setText={setText} />}

      {page === "games" && <Games setText={setText} />}

      {page === "settings" && (
        <Accessibility settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
}

export default App;