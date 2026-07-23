# 🌈 SpeakEasy Kids

SpeakEasy Kids is a React-based speech practice app for children. It listens to a
child speaking, turns their voice into text, gives friendly AI feedback, and
wraps everything in accessibility settings, vocabulary games, achievements, and
a parent dashboard — so both the child and the parent get value out of every
session.

---

## ✨ Features

- 🎤 **Live speech-to-text** using the browser's built-in Speech Recognition API
- 🌍 **Multi-language support** (English, Hindi, Tamil, Telugu) with automatic
  **translation to Hindi** so the transcript can always show Hindi text,
  regardless of the language spoken
- 🔊 **Text-to-speech playback** of the transcript
- 🤖 **AI speech feedback** — encouraging, gentle feedback on what was said
- 📝 **Editable transcript** with copy, download, and clear controls
- 📊 **Live stats** — word count, character count, recording time
- 🏆 **Achievements & stars** that unlock as the child practices more
- 🖼 **Picture vocabulary** — tap-to-speak word cards by category
- 🎮 **Speech practice game** — say the word shown and check your answer
- 👤 **Child profile** — name, avatar, and learning level
- 📈 **Parent dashboard** — progress overview and practice history
- ♿ **Accessibility settings** — large text, high contrast, dyslexia-friendly
  font, reduced animation
- 🌙 **Dark mode**
- 📱 **Responsive design** for mobile and desktop

---

## 🗂 Project Structure

```
src/
├── App.jsx                  # Root component, page routing & shared state
├── App.css                  # All app styling
├── main.jsx                 # React entry point
└── components/
    ├── speech.js             # Speech recognition, text-to-speech, translation
    ├── aiFeedbackService.js  # AI feedback API integration point
    ├── Header.jsx            # Top navigation bar, language & dark mode toggle
    ├── Microphone.jsx        # Mic button, recording logic, live transcription
    ├── Transcript.jsx        # Editable transcript text box
    ├── SpeechFeedback.jsx    # "Check My Speech" AI feedback panel
    ├── Controls.jsx          # Read / Copy / Download / Clear buttons
    ├── Stats.jsx             # Word / character / time counters
    ├── Achievements.jsx      # Stars and badges based on progress
    ├── Instructions.jsx      # "How to use" step list
    ├── Profile.jsx           # Child profile creation & editing
    ├── Dashboard.jsx         # Parent-facing progress dashboard
    ├── Vocabulary.jsx        # Picture vocabulary word cards
    ├── Games.jsx             # Speech practice mini-game
    └── Accessibility.jsx     # Accessibility settings page
```

---

## 🧩 File-by-File Explanation

### `main.jsx`
The application's entry point. Mounts the `<App />` component into the
`#root` DOM element using React's `createRoot`, wrapped in `<StrictMode>`
for extra development-time checks.

### `App.jsx`
The root component. It:
- Holds all shared state: current `page`, transcript `text`, `language`,
  `darkMode`, `recordingTime`, accessibility `settings`, child `profile`,
  and practice `stats`.
- Computes derived state (`words` — a live word count from `text`).
- Renders the `<Header />` on every page.
- Switches between pages (`home`, `profile`, `dashboard`, `vocabulary`,
  `games`, `settings`) based on the `page` state — this is a simple
  client-side router without any routing library.
- On the `home` page, renders the mic, transcript, AI feedback, controls,
  stats, and achievements — with the mic and transcript now placed
  side-by-side in a `.mic-transcript-row` wrapper.

### `App.css`
All visual styling for the app: layout, colors, cards, buttons, dark mode,
the mic pulse animation, and responsive breakpoints for mobile screens.

---

### `components/speech.js`
A shared utility module — no UI, just logic:
- `SpeechSupported` — checks whether the browser supports the Speech
  Recognition API at all.
- `createSpeechRecognizer(language, onResult, onStart, onEnd, onError)` —
  a factory that builds and configures a `SpeechRecognition` instance
  (currently `Microphone.jsx` builds its own recognizer directly instead,
  for finer control over restart behavior — see below).
- `speakText(text, language)` — reads text aloud using
  `SpeechSynthesisUtterance` (browser text-to-speech).
- `stopSpeaking()` — cancels any speech currently playing.
- `formatTime(seconds)` — formats a seconds count as `MM:SS`.
- `translateToHindi(text, sourceLanguage)` — sends recognized speech to the
  free **MyMemory Translation API** and returns the Hindi translation.
  Falls back to the original text if the request fails, and skips the
  network call entirely if the source language is already Hindi.

### `components/aiFeedbackService.js`
The single entry point for AI speech feedback. `getSpeechFeedback(text,
language)` currently returns **mocked** feedback (praise, corrections,
encouragement) after a short simulated delay. The file is deliberately
isolated so a real backend call can be dropped in later without touching
any UI code — the commented-out `fetch(...)` block shows exactly what
shape the real request/response should take.

### `components/Header.jsx`
The sticky top navigation bar. Contains:
- The app logo/title.
- A hamburger menu button (mobile) that toggles the nav.
- Navigation buttons for every page (Home, Profile, Dashboard, Words,
  Games, Settings).
- The 🌍 language `<select>` — controls which language the microphone
  listens in (`language` state, lifted up to `App.jsx` via `setLanguage`).
- The 🌙/☀️ dark mode toggle button.

### `components/Microphone.jsx`
The core recording component. Responsibilities:
- Creates a single `SpeechRecognition` instance once (via `useRef`) and
  reuses it, instead of recreating it on every re-render — this avoids a
  bug where old recognizer instances kept running in the background.
- Tracks recording intent (`shouldBeRecordingRef`) separately from actual
  engine state (`isRunningRef`), so it can safely auto-restart the
  recognizer if the browser ends a session on its own (silence timeout,
  ~60s cap, network hiccup) without the user having tapped "stop."
  `attemptStart()` retries safely if `.start()` is called while a
  previous session is still shutting down.
- Keeps a `languageRef` in sync with the selected language so the
  recognizer and the translator always use the current language, even
  though the result handler is only wired up once.
- On each final speech result, sends the recognized text through
  `translateToHindi()` and only then appends the **Hindi translation** to
  the transcript (via `setText`) and logs it to `practiceHistory` in
  `localStorage`.
- Only a small set of errors (`not-allowed`, `service-not-allowed`) stop
  recording outright and alert the user; everything else is treated as
  recoverable and left to the auto-restart logic.
- Renders the pulsing mic button and a "Listening..." / "Tap microphone"
  label.

### `components/Transcript.jsx`
A simple, editable `<textarea>` bound to the shared `text` state — shows
whatever has been transcribed (and translated) so far, and lets the user
manually edit it.

### `components/SpeechFeedback.jsx`
The "🤖 Check My Speech" panel. Calls `getSpeechFeedback()` from
`aiFeedbackService.js` with the current transcript and language, shows a
loading state while waiting, and displays the returned praise, optional
correction tips, and an encouragement line. Shows a friendly error message
if the request fails or if there's no text yet.

### `components/Controls.jsx`
Four action buttons under the transcript:
- **🔊 Read** — speaks the transcript aloud using `SpeechSynthesisUtterance`.
- **📋 Copy** — copies the transcript to the clipboard.
- **💾 Download** — downloads the transcript as a `.txt` file.
- **🗑 Clear** — empties the transcript.

### `components/Stats.jsx`
Displays three live counters: word count, character count, and recording
time (formatted as `MM:SS`).

### `components/Achievements.jsx`
Recalculates stars and badges every time `stats` changes:
- 5+ words → "First Words" ⭐
- 25+ words → "Word Explorer" 🌈
- 100+ words → "Speech Champion" 🏆
- 10+ minutes → "Practice Hero" 🎤

Persists the result to `localStorage` under `achievements`.

### `components/Instructions.jsx`
A static "How to use" card with a simple ordered list of steps. (Not
currently rendered inside `App.jsx`, but available to drop into any page.)

### `components/Profile.jsx`
Lets a child (or parent) set up a profile: name, avatar (chosen from an
emoji grid), and learning level (Beginner / Intermediate / Advanced).
Loads any previously saved profile from `localStorage` on mount and saves
updates back to `localStorage` under `childProfile`.

### `components/Dashboard.jsx`
The parent-facing view. Shows the child's avatar and name, a computed
progress level (🌱 Beginner / 🌿 Growing / 🌳 Advanced based on word count),
live stats (words spoken, minutes practiced, sessions), and a practice
history list loaded from `localStorage` (`practiceHistory` — the same log
that `Microphone.jsx` writes to after every final speech result).

### `components/Vocabulary.jsx`
A picture-vocabulary page with four categories (Food, Animals, Needs,
Feelings). Tapping a word card appends that word directly to the shared
transcript `text`, so kids can build sentences by tapping pictures instead
of (or alongside) speaking.

### `components/Games.jsx`
A simple speech practice game: shows an emoji + prompts the child to say
(or type) the matching word, checks the answer, tracks a running score,
and appends correctly-answered words to the transcript.

### `components/Accessibility.jsx`
The settings page for accessibility toggles: Large Text, High Contrast,
Dyslexia Font, Reduce Animation. Persists settings to `localStorage`
(`accessibilitySettings`) and loads them back on mount. Each toggle is
reflected live across the whole app via className flags applied on the
root `<div className="app">` in `App.jsx`.

---

## 🌍 How translation works

1. Pick the language you're **speaking in** from the header's 🌍 dropdown
   (e.g. English).
2. The Web Speech API listens and transcribes in that language.
3. `translateToHindi()` sends the recognized text to the free MyMemory
   Translation API (`api.mymemory.translated.net`) and gets back a Hindi
   translation.
4. The **Hindi translation** — not the original words — is what's written
   into the transcript box.
5. If you're already speaking Hindi, translation is skipped entirely.
6. If the translation request fails (offline, rate-limited, etc.), the
   original spoken text is used instead so nothing is lost.

> Note: MyMemory's free tier has a modest daily usage cap per IP address.
> For production or heavy use, swap in a paid translation API (Google
> Cloud Translate, Azure Translator, etc.) inside `translateToHindi()` —
> it's the only function that needs to change.

---

## 🛠 Tech Stack

- **React** (functional components + hooks: `useState`, `useEffect`, `useRef`)
- **Web Speech API** — `SpeechRecognition` / `webkitSpeechRecognition` for
  speech-to-text, `SpeechSynthesisUtterance` for text-to-speech
- **MyMemory Translation API** — free, no-key translation service
- **localStorage** — persists profile, accessibility settings, achievements,
  and practice history across sessions
- Plain CSS (`App.css`) — no CSS framework

---

## ▶️ Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open the app in **Chrome or Edge** — speech recognition currently only
works reliably in Chromium-based browsers.

---

## ⚠️ Known Limitations

- Speech recognition and synthesis depend entirely on browser support;
  Firefox and Safari have limited or no support for `SpeechRecognition`.
- Hindi recognition/translation quality depends on the browser's language
  pack and the MyMemory API's translation quality — it's not perfect for
  complex sentences.
- The AI feedback in `aiFeedbackService.js` is currently a **mock** — no
  real backend call is wired up yet.
- All persisted data (profile, stats, settings, history) lives in
  `localStorage`, so it's per-browser/per-device only — there's no account
  system or cloud sync.

---

## 🚀 Possible Future Improvements

- Wire up a real backend for `getSpeechFeedback()`
- Add more languages to the translation pipeline
- Sync profile/progress data to a real account instead of `localStorage`
- Add more games and vocabulary categories
- Add unit tests for the speech and translation logic