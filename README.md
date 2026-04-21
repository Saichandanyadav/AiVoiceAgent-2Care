# 🩺 2Care.ai – Voice-Based AI Medical Assistant

An AI-powered **voice-first healthcare assistant** that allows users to describe symptoms, get doctor recommendations, and book appointments through a conversational interface.

Built to simulate a **real-world AI healthcare system** with scalable architecture.

---

## 🚀 Live Demo

🌐 **Frontend (Vercel):**
[https://ai-voice-agent-2-care.vercel.app/](https://ai-voice-agent-2-care.vercel.app/)

🖥 **Backend API (Render):**
[https://aivoiceagent-2care.onrender.com/](https://aivoiceagent-2care.onrender.com/)

📦 **GitHub Repository:**
[https://github.com/Saichandanyadav/AiVoiceAgent-2Care](https://github.com/Saichandanyadav/AiVoiceAgent-2Care)

---

## 📁 Project Structure (Root Level)

```
voice-ai-agent/
│
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   └── VoiceRecorder.tsx
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                 # Node.js + Express Backend
│   ├── src/
│   │   ├── agents/
│   │   │   └── agent.ts
│   │   ├── controllers/
│   │   │   └── voice.controller.ts
│   │   ├── routes/
│   │   │   └── voice.routes.ts
│   │   ├── services/
│   │   │   ├── speech.service.ts
│   │   │   ├── tts.service.ts
│   │   │   └── memory.service.ts
│   │   ├── utils/
│   │   │   └── latency.ts
│   │   └── app.ts
│   ├── dist/               # Compiled output (TS → JS)
│   ├── package.json
│   └── tsconfig.json
│
├── uploads/                # Incoming audio files
├── outputs/                # Generated audio responses
├── README.md
└── .gitignore
```

---

## 🧠 Project Overview

2Care.ai is a **voice-driven AI assistant simulation** designed to demonstrate:

* 🎤 Voice input → conversational flow
* 🧠 AI-driven decision making (mocked)
* 👨‍⚕️ Doctor recommendation system
* 📅 Appointment booking workflow
* 💬 Real-time chat UI with animations

---

## ⚠️ IMPORTANT: Why Mock Data is Used

This project **intentionally uses mock implementations** instead of real AI APIs.

### ❌ Reason

* OpenAI free credits were not available
* Paid API usage was not enabled

### ✅ What is Mocked

* Speech-to-Text (STT)
* AI Agent responses
* Text-to-Speech (TTS)
* Doctor availability
* Appointment booking logic

---

## 🧪 Mock System Design

### 🎤 Voice Flow

```
User Voice → Audio Upload → Backend → Mock STT → Agent → Response
```

### 🧠 AI Flow

```
Symptoms → Doctor Suggestion → Slot Selection → Confirmation
```

---

## 💬 Example Interaction

**User:**
"I have stomach pain"

**System Flow:**

* Detects symptom
* Suggests doctors
* Shows available slots
* Confirms appointment

---

## 👨‍⚕️ Doctor System (Mocked)

* Dr. Arjun Mehta → Gastroenterologist
* Dr. Sneha Reddy → General Physician
* Dr. Vikram Iyer → Internal Medicine Specialist

UI includes:

* Avatar initials
* Specialty tags
* Interactive selection cards

---

## 📅 Slot System

Available slots:

* 11:00 AM
* 02:00 PM
* 04:00 PM

Features:

* Button-based selection
* Responsive grid layout
* Visual feedback

---

## 💡 Why This Mock Architecture Matters

This is not a limitation — it’s intentional design.

### Key Advantages:

* ✔ No dependency on paid APIs
* ✔ Fully testable system flow
* ✔ Faster frontend development
* ✔ Clear separation of concerns
* ✔ Production-ready structure

---

## 🚀 Scalability (Future Upgrade Path)

This system is designed to **plug into real AI easily**.

### 🔁 Replaceable Modules

* STT → OpenAI Whisper / Deepgram
* AI Agent → GPT-4 / GPT-4o
* TTS → OpenAI / ElevenLabs
* Doctor Data → Real hospital database
* Slots → Calendar APIs

---

## 🧠 Future Roadmap

### Phase 1 (Current)

* Mock AI assistant
* Voice-based UI
* Simulated booking

### Phase 2

* Real AI (OpenAI integration)
* Real speech-to-text

### Phase 3

* Hospital DB integration
* Real doctor scheduling

### Phase 4

* Payments
* Video consultation

---

## ⚙️ Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Lucide Icons
* Web Speech API

### Backend

* Node.js
* Express
* Multer
* TypeScript

---

## 📡 API Flow

```
POST /api/voice

→ Upload Audio
→ Mock Speech-to-Text
→ Agent Processing
→ Response JSON
→ UI Rendering
```

---

## 📊 Key Features

* 🎤 Voice-based interaction
* 🧠 AI conversation simulation
* 👨‍⚕️ Doctor recommendation
* 📅 Appointment booking
* 💬 Real-time chat UI
* 📱 Responsive design
* ⚡ Smooth animations

---

## 🧑‍💻 Author

Sai Chandan Gundaboina

---

## 📌 Final Note

This project is a **production-style AI system simulation**.

Even though it uses mock data, the architecture is built in a way that:

* Real AI can be plugged in instantly
* Backend can scale independently
* Frontend is already production-ready
