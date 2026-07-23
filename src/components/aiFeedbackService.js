// aiFeedbackService.js
//
// Single entry point for AI speech feedback.
// Swap the body of getSpeechFeedback() for a real call to your backend
// once it's ready. Everything else in the app (SpeechFeedback.jsx) only
// talks to this function, so this is the only file you need to touch.

/**
 * Ask your backend to analyze what the child said and return feedback.
 *
 * Expected request (once you wire it up), e.g.:
 *   POST /api/speech-feedback
 *   { text: "I want water", language: "en-US" }
 *
 * Expected response shape (what this function should resolve to):
 *   {
 *     praise: string,          // one encouraging line, always present
 *     corrections: string[],   // 0-3 short, gentle correction tips
 *     encouragement: string,   // closing motivational line
 *   }
 */
export async function getSpeechFeedback(text, language = "en-US") {
  if (!text || !text.trim()) {
    throw new Error("No speech text to analyze yet.");
  }

  // --- TODO: replace this block with your real backend call ---
  //
  // const response = await fetch("/api/speech-feedback", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ text, language }),
  // });
  //
  // if (!response.ok) {
  //   throw new Error("Speech feedback request failed");
  // }
  //
  // return await response.json();

  // Temporary mock so the UI is testable before the backend exists.
  await new Promise((resolve) => setTimeout(resolve, 700));

  const wordCount = text.trim().split(/\s+/).length;

  return {
    praise:
      wordCount >= 4
        ? "🌟 Great sentence! You used lots of words!"
        : "🌟 Nice job saying that out loud!",
    corrections:
      wordCount < 2
        ? ["Try saying a full sentence, like 'I want water.'"]
        : [],
    encouragement: "Keep practicing — every word counts! 💙",
  };
  // --- end mock ---
}