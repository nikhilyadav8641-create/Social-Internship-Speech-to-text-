import { useState } from "react";
import { getSpeechFeedback } from "./aiFeedbackService";

function SpeechFeedback({ text, language }) {
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState(null);

  const [error, setError] = useState("");

  async function checkSpeech() {
    setError("");

    setFeedback(null);

    if (!text || !text.trim()) {
      setError("Say something first, then tap the button 🎤");

      return;
    }

    setLoading(true);

    try {
      const result = await getSpeechFeedback(text, language);

      setFeedback(result);
    } catch (err) {
      setError("Couldn't get feedback right now. Try again 😊");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card speech-feedback">
      <h2 style={{ textAlign: 'center' }}>🤖 AI Speech Feedback</h2>

      <p style={{ textAlign: 'center' }} >Get friendly feedback on what you said.</p>

      <button className="check-btn" onClick={checkSpeech} disabled={loading}>
        {loading ? "🤔 Thinking..." : "🤖 Check My Speech"}
      </button>

      {error && <p className="feedback-error">{error}</p>}

      {feedback && (
        <div className="feedback-result">
          <p className="feedback-praise">{feedback.praise}</p>

          {feedback.corrections.length > 0 && (
            <div className="feedback-tips">
              <h3>💡 Tips</h3>

              <ul>
                {feedback.corrections.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="feedback-encouragement">{feedback.encouragement}</p>
        </div>
      )}
    </section>
  );
}

export default SpeechFeedback;