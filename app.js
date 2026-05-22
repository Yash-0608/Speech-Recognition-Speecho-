const micBtn = document.getElementById("micBtn");
const languageEl = document.getElementById("language");
const clearBtn = document.getElementById("clearBtn");
const liveStateEl = document.getElementById("liveState");
const interimEl = document.getElementById("interim");
const outputEl = document.getElementById("output");
const waveBarsEl = document.getElementById("waveBars");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let listening = false;
let shouldKeepListening = false;
let finalText = "";
let waveTimer = null;

for (let i = 0; i < 58; i += 1) {
  const bar = document.createElement("span");
  waveBarsEl.appendChild(bar);
}

const bars = Array.from(waveBarsEl.children);

function setState(text, active) {
  liveStateEl.textContent = text;
  document.body.classList.toggle("listening", Boolean(active));
}

function refreshTranscript() {
  const trimmed = finalText.trim();
  outputEl.textContent = trimmed || "No speech captured yet.";
}

function paintWave(active) {
  bars.forEach((bar, index) => {
    const centerWeight = 1 - Math.abs(index - bars.length / 2) / (bars.length / 2);
    const base = active ? 10 : 4;
    const range = active ? 56 : 5;
    const randomPart = Math.random() * range;
    const shaped = base + randomPart * Math.max(0.3, centerWeight);
    bar.style.height = `${Math.round(shaped)}px`;
  });
}

function startWaveAnimation() {
  clearInterval(waveTimer);
  waveTimer = setInterval(() => paintWave(listening), 120);
}

function startRecognition() {
  if (!recognition) return;
  recognition.lang = languageEl.value;
  try {
    recognition.start();
  } catch {
    // Ignore invalid-state errors from double starts.
  }
}

function stopRecognition() {
  if (!recognition) return;
  try {
    recognition.stop();
  } catch {
    // Ignore transient stop errors.
  }
}

function toggleMic() {
  if (!recognition) return;

  if (!listening && !shouldKeepListening) {
    shouldKeepListening = true;
    startRecognition();
    return;
  }

  shouldKeepListening = false;
  stopRecognition();
}

function setupRecognition() {
  if (!SpeechRecognition) {
    setState("BROWSER DOES NOT SUPPORT SPEECH RECOGNITION", false);
    micBtn.disabled = true;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.lang = languageEl.value;

  recognition.onstart = () => {
    listening = true;
    setState("LISTENING...", true);
    micBtn.title = "Stop listening";
  };

  recognition.onend = () => {
    listening = false;
    if (shouldKeepListening) {
      setState("RECONNECTING...", false);
      setTimeout(startRecognition, 180);
    } else {
      setState("MIC OFF - CLICK THE MIC TO START", false);
      micBtn.title = "Start listening";
      interimEl.textContent = "...";
    }
  };

  recognition.onerror = (event) => {
    if (event.error === "not-allowed") {
      shouldKeepListening = false;
      setState("MIC PERMISSION DENIED", false);
      return;
    }
    setState(`ERROR: ${String(event.error || "unknown")}`, false);
  };

  recognition.onresult = (event) => {
    let interimText = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      const text = result[0].transcript.trim();
      if (result.isFinal) {
        finalText += `${text} `;
      } else {
        interimText += `${text} `;
      }
    }
    interimEl.textContent = interimText.trim() || "...";
    refreshTranscript();
  };
}

micBtn.addEventListener("click", toggleMic);

languageEl.addEventListener("change", () => {
  if (!recognition) return;
  recognition.lang = languageEl.value;
  if (listening) {
    stopRecognition();
    shouldKeepListening = true;
  }
});

clearBtn.addEventListener("click", () => {
  finalText = "";
  interimEl.textContent = "...";
  refreshTranscript();
});

setupRecognition();
refreshTranscript();
paintWave(false);
startWaveAnimation();
