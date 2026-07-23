import { useEffect, useRef, useState } from "react";
import { translateToHindi } from "./speech";

function Microphone({
  text,
  setText,
  language,
  recordingTime,
  setRecordingTime,
}) {
  const [recording, setRecording] = useState(false);

  // Create the recognition object ONCE and keep it in a ref.
  // Before, a new SpeechRecognition() was created on every render
  // (because setText triggers a re-render), so tapping "stop" only
  // stopped the newest instance while the original one kept running
  // in the background and kept writing to the transcript.
  const recognitionRef = useRef(null);

  // Tracks whether the user WANTS to be recording, separate from whether
  // the browser's recognition session happens to be alive right now.
  // The engine can end a session on its own (silence timeout, network
  // hiccup, ~60s cap) - when that happens we auto-restart as long as
  // this is still true, instead of silently going deaf.
  const shouldBeRecordingRef = useRef(false);

  // Tracks whether the browser's recognition session is *actually* alive
  // right now. Calling .start() while a session is still in the middle
  // of shutting down (right after .stop()) throws InvalidStateError in
  // Chrome, and that was silently breaking "stop then immediately start
  // again". attemptStart() below uses this to retry safely instead.
  const isRunningRef = useRef(false);

  // onresult is wired up once inside the effect below (deps: []), so it
  // closes over whatever `language` was on first render. Reading from a
  // ref instead means it always sees the language currently selected,
  // which we need to tell the translator what language was spoken.
  const languageRef = useRef(language);

  function attemptStart(recognition) {
    if (isRunningRef.current) {
      return; // already running, nothing to do
    }

    try {
      recognition.start();
    } catch (e) {
      console.log("[mic] start() failed, will retry:", e.message);

      // The previous session is probably still shutting down.
      // Wait for it to fully end, then try again.
      setTimeout(() => {
        if (shouldBeRecordingRef.current && !isRunningRef.current) {
          attemptStart(recognition);
        }
      }, 300);
    }
  }

  useEffect(() => {
    if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalResult = "";
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalResult += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      console.log("[mic] onresult - final:", JSON.stringify(finalResult), "interim:", JSON.stringify(interim));

      if (finalResult.trim() !== "") {
        const spoken = finalResult.trim();

        translateToHindi(spoken, languageRef.current).then((hindiText) => {
          setText((previous) =>
            (previous ? previous.trim() + " " : "") + hindiText,
          );

          const old = JSON.parse(localStorage.getItem("practiceHistory")) || [];

          old.push({
            date: new Date().toLocaleDateString(),
            words: hindiText.trim().split(/\s+/).length,
          });

          localStorage.setItem("practiceHistory", JSON.stringify(old));
        });
      }
    };

    recognition.onstart = () => {
      console.log("[mic] recognition started");
      isRunningRef.current = true;
    };

    recognition.onend = () => {
      console.log("[mic] recognition ended, shouldBeRecording =", shouldBeRecordingRef.current);
      isRunningRef.current = false;

      // The browser stopped the session. If the user still wants to be
      // recording (they haven't tapped stop), restart it automatically
      // instead of silently going quiet. A tiny delay avoids some
      // browsers throwing "already started" errors.
      if (shouldBeRecordingRef.current) {
        setTimeout(() => {
          if (shouldBeRecordingRef.current) {
            attemptStart(recognition);
          }
        }, 250);
      } else {
        setRecording(false);
      }
    };

    recognition.onerror = (event) => {
      console.log("[mic] error:", event.error);

      // Only a small set of errors mean the user actually can't record
      // right now (permission denied / no mic hardware / blocked by
      // browser policy). Everything else - including "aborted", "no-speech",
      // "network", "audio-capture" glitches - is treated as recoverable and
      // left to onend's auto-restart, instead of killing the session.
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        shouldBeRecordingRef.current = false;
        setRecording(false);
        alert("Microphone access was blocked. Please allow microphone permission and try again.");
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldBeRecordingRef.current = false;
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []); // created only once

  // Keep the language up to date without recreating the recognizer.
  useEffect(() => {
    languageRef.current = language;

    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  function startSpeech() {
    if (!recognitionRef.current) {
      alert("Use Chrome browser for speech recognition");
      return;
    }

    if (!recording) {
      shouldBeRecordingRef.current = true;
      attemptStart(recognitionRef.current);
      setRecording(true);
    } else {
      shouldBeRecordingRef.current = false;
      recognitionRef.current.stop();
      setRecording(false);
    }
  }

  useEffect(() => {
    let timer;

    if (recording) {
      timer = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [recording]);

  return (
    <section className="mic-section">
      <div className="pulse">
        <button
          className={recording ? "mic active" : "mic"}
          onClick={startSpeech}
        >
          🎤
        </button>
      </div>

      <h3>{recording ? "Listening..." : "Tap microphone"}</h3>
    </section>
  );
}

export default Microphone;