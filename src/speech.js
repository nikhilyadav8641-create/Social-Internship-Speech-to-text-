// =======================================
// SpeakEasy Kids React
// speech.js
// Speech Recognition + Text To Speech
// =======================================

// Check browser support

export const SpeechSupported =
  "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

// =======================================
// Create Speech Recognition
// =======================================

export function createSpeechRecognizer(
  language,
  onResult,
  onStart,
  onEnd,
  onError,
) {
  if (!SpeechSupported) {
    alert("Speech recognition is not supported. Please use Chrome or Edge.");

    return null;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = true;

  recognition.interimResults = true;

  recognition.lang = language;

  recognition.onstart = () => {
    if (onStart) {
      onStart();
    }
  };

  recognition.onresult = (event) => {
    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    if (onResult) {
      onResult(transcript);
    }
  };

  recognition.onerror = (error) => {
    console.log("Speech error:", error);

    if (onError) {
      onError(error);
    }
  };

  recognition.onend = () => {
    if (onEnd) {
      onEnd();
    }
  };

  return recognition;
}

// =======================================
// Text To Speech
// =======================================

export function speakText(text, language = "en-US") {
  if (!text) {
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = language;

  speech.rate = 0.9;

  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

// =======================================
// Stop Speaking
// =======================================

export function stopSpeaking() {
  window.speechSynthesis.cancel();
}

// =======================================
// Format Timer
// =======================================

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );
}
