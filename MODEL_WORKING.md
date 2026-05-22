# Speecho Model Working

## 1. Overview

`speecho` is a live speech-recognition interface.

- The user clicks the mic button.
- The app starts listening.
- Spoken words are converted into text in real time.
- The transcript is shown on screen (interim + final text).

## 2. Technologies Used

- **Backend:** Python + Flask
- **Frontend:** HTML, CSS, JavaScript
- **Speech Engine:** Browser Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`)

## 3. How Recognition Is Achieved

### Step 1: App load

- Flask serves:
  - `templates/index.html`
  - `static/style.css`
  - `static/app.js`

### Step 2: Recognition setup

In `static/app.js`, the app creates a speech recognition object:

- `continuous = true` (keeps listening)
- `interimResults = true` (live partial words)
- `lang = selected language` (e.g., `en-US`, `en-IN`, `hi-IN`)

### Step 3: Mic button controls listening

- User clicks mic button -> `recognition.start()`
- UI state changes to `LISTENING...`
- User clicks mic again -> `recognition.stop()`
- UI returns to `MIC OFF`

### Step 4: Text generation

During listening, browser events return recognized speech:

- **Interim text:** temporary running text while speaking
- **Final text:** confirmed words appended to transcript

The app updates:

- `#interim` for temporary text
- `#output` for final transcript

### Step 5: Error and permission handling

- If mic permission is denied, the app shows `MIC PERMISSION DENIED`.
- If recognition ends unexpectedly while active, the app attempts reconnect.

## 4. UI/Experience Features

- Futuristic HUD-style theme
- Central mic button as primary action
- Listening status text
- Animated waveform bars
- Language selector
- Clear transcript button

## 5. Important Note About the “Model”

In this current implementation, the speech-to-text model is provided by the **browser speech engine** (Web Speech API implementation), not a custom-trained neural model inside Python.

So the project currently focuses on:

- interaction design,
- real-time mic workflow,
- and speech-recognition integration.

## 6. Current Project Files Involved

- `app.py` (Flask server)
- `templates/index.html` (structure)
- `static/style.css` (theme + animations)
- `static/app.js` (mic control + recognition logic)

