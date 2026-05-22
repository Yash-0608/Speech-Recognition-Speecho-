Speecho 🎙️
Real-Time Futuristic Speech Recognition Interface

A modern real-time speech recognition web application built using Flask and the Browser Web Speech API.
Designed with a futuristic HUD-inspired interface for seamless voice-to-text interaction.

🚀 Project Overview

Speecho is a live speech-to-text web application that converts spoken words into text in real time.

The application focuses on:

smooth microphone interaction,
real-time transcript rendering,
futuristic UI/UX,
and lightweight browser-based speech recognition.

Unlike heavy AI-based speech systems, this project uses the browser’s native speech engine through the Web Speech API, making it fast, responsive, and easy to deploy.

✨ Features
🎤 Real-time speech recognition
⚡ Instant interim and final transcript generation
🌍 Multi-language support
🔄 Continuous listening mode
🧠 Smart auto-reconnect handling
🖥️ Futuristic sci-fi inspired UI
📡 Live waveform animation
🧹 Clear transcript functionality
🔐 Microphone permission handling
🛠️ Tech Stack
Technology	Purpose
Python	Backend Logic
Flask	Web Framework
HTML5	Structure
CSS3	Styling & Animations
JavaScript	Speech Recognition Logic
Web Speech API	Speech-to-Text Engine
📂 Project Structure
speecho/
│
├── app.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── app.js
│
└── README.md
⚙️ How It Works
1️⃣ Application Startup

The Flask server initializes and serves:

index.html
style.css
app.js
2️⃣ Speech Recognition Initialization

Inside app.js, a speech recognition object is created using:

const recognition = new webkitSpeechRecognition();

Configuration includes:

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
Configuration Meaning
Property	Purpose
continuous	Keeps listening continuously
interimResults	Shows live temporary text
lang	Sets recognition language
3️⃣ Microphone Workflow
Start Listening

When the user clicks the microphone button:

recognition.start();

The interface changes to:

LISTENING...
Stop Listening
recognition.stop();

The UI returns to idle mode.

4️⃣ Real-Time Transcript Processing

The browser continuously emits speech recognition events.

The app separates:

Interim text → temporary running text
Final text → confirmed transcript

Example:

recognition.onresult = (event) => {
   // transcript processing
};
🧠 Speech Recognition Architecture
User Speech
     ↓
Microphone Input
     ↓
Browser Web Speech API
     ↓
Speech Recognition Engine
     ↓
Interim + Final Transcript
     ↓
Frontend UI Rendering
🎨 UI Design Philosophy

The interface is designed with a:

futuristic HUD theme,
glowing neon accents,
minimal interaction flow,
immersive voice-assistant feel.
UI Components
Central microphone button
Animated sound bars
Listening status indicator
Language selector
Transcript display area
Clear transcript button
🌐 Supported Languages

The project supports multiple languages through the browser engine.

Examples:

Language	Code
English (US)	en-US
English (India)	en-IN
Hindi	hi-IN
🔐 Error Handling

The app handles:

microphone permission denial,
recognition interruptions,
unexpected recognition termination,
unsupported browser detection.

Example scenarios:

MIC PERMISSION DENIED
Speech Recognition Not Supported
📌 Important Note

This project does not implement a custom-trained speech recognition neural network.

Instead, speech recognition is powered by the browser’s built-in:

SpeechRecognition
webkitSpeechRecognition

implementation.

The focus of this project is:

real-time interaction,
speech workflow integration,
frontend experience,
and system architecture.
