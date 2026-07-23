import { useState } from "react";

function Vocabulary({ setText }) {
  const [category, setCategory] = useState("food");

  const words = {
    food: [
      {
        word: "Apple",
        icon: "🍎",
      },

      {
        word: "Water",
        icon: "💧",
      },

      {
        word: "Milk",
        icon: "🥛",
      },

      {
        word: "Bread",
        icon: "🍞",
      },

      {
        word: "Banana",
        icon: "🍌",
      },
    ],

    animals: [
      {
        word: "Dog",
        icon: "🐶",
      },

      {
        word: "Cat",
        icon: "🐱",
      },

      {
        word: "Bird",
        icon: "🐦",
      },

      {
        word: "Fish",
        icon: "🐟",
      },
    ],

    needs: [
      {
        word: "Help",
        icon: "🙋",
      },

      {
        word: "Sleep",
        icon: "😴",
      },

      {
        word: "Home",
        icon: "🏠",
      },

      {
        word: "School",
        icon: "🏫",
      },
    ],

    feelings: [
      {
        word: "Happy",
        icon: "😊",
      },

      {
        word: "Sad",
        icon: "😢",
      },

      {
        word: "Angry",
        icon: "😡",
      },

      {
        word: "Love",
        icon: "❤️",
      },
    ],
  };

  function addWord(word) {
    setText((previous) => previous + " " + word);
  }

  return (
    <section className="vocabulary-page">
      <div className="vocabulary-card">
        <h1>🖼 Picture Vocabulary</h1>

        <p>Tap a picture to speak a word</p>

        <div className="category-buttons">
          <button onClick={() => setCategory("food")}>🍎 Food</button>

          <button onClick={() => setCategory("animals")}>🐶 Animals</button>

          <button onClick={() => setCategory("needs")}>🏠 Needs</button>

          <button onClick={() => setCategory("feelings")}>😊 Feelings</button>
        </div>

        <div className="word-grid">
          {words[category].map((item) => (
            <button
              className="word-card"
              key={item.word}
              onClick={() => addWord(item.word)}
            >
              <span>{item.icon}</span>

              <strong>{item.word}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Vocabulary;
