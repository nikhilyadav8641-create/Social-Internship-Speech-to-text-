import { useState } from "react";

function Games({ setText }) {
  const gameWords = [
    {
      word: "Apple",
      image: "🍎",
    },

    {
      word: "Dog",
      image: "🐶",
    },

    {
      word: "Water",
      image: "💧",
    },

    {
      word: "Sun",
      image: "☀️",
    },

    {
      word: "Cat",
      image: "🐱",
    },

    {
      word: "Book",
      image: "📚",
    },
  ];

  const [current, setCurrent] = useState(0);

  const [answer, setAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [message, setMessage] = useState("Say the word shown below 🎤");

  function checkAnswer() {
    if (answer.toLowerCase() === gameWords[current].word.toLowerCase()) {
      setScore(score + 1);

      setMessage("🎉 Great job! Correct!");

      setText((previous) => previous + " " + gameWords[current].word);

      nextWord();
    } else {
      setMessage("😊 Try again. You can do it!");
    }
  }

  function nextWord() {
    setAnswer("");

    setCurrent((current + 1) % gameWords.length);
  }

  return (
    <section className="games-page">
      <div className="game-card">
        <h1>🎮 Speech Practice Game</h1>

        <div className="score">⭐ Score: {score}</div>

        <div className="question">
          <div className="game-image">{gameWords[current].image}</div>

          <h2>Say this word</h2>
        </div>

        <input
          type="text"
          placeholder="Type what you said"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button className="check-btn" onClick={checkAnswer}>
          ✅ Check Answer
        </button>

        <p className="game-message">{message}</p>

        <button className="next-btn" onClick={nextWord}>
          ➡️ Next Word
        </button>
      </div>
    </section>
  );
}

export default Games;
