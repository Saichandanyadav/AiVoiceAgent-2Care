# 🩺 2Care.ai – Voice-Based AI Medical Assistant

An AI-powered **voice-first healthcare assistant** that helps users describe symptoms, get doctor recommendations, and book appointments through a conversational experience.

Built with a focus on **real-time voice interaction, medical flow simulation, and scalable AI architecture design**.

---

## 🚀 Live Demo

🌐 Vercel (Frontend):  
https://your-vercel-link.vercel.app

🖥 Backend API:  
https://your-backend-link.onrender.com

📦 GitHub Repo:  
https://github.com/your-username/2care-ai

---

## 📁 Project Structure

```

2care-ai/
│
├── frontend/ (Next.js App)
│   ├── app/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   └── VoiceRecorder.tsx
│   ├── styles/
│   └── public/
│
├── backend/ (Node.js + Express)
│   ├── src/
│   │   ├── agents/
│   │   │   └── agent.ts
│   │   ├── controllers/
│   │   │   └── voice.controller.ts
│   │   ├── routes/
│   │   │   └── voice.routes.ts
│   │   ├── services/
│   │   │   ├── speech.service.ts
│   │   │   └── tts.service.ts
│   │   ├── utils/
│   │   │   └── latency.ts
│   │   └── server.ts
│
├── uploads/
├── outputs/
├── package.json
└── README.md

````

---

## 🧠 Project Overview

2Care.ai is a **simulated AI healthcare assistant** designed to demonstrate:

- Voice-to-text interaction
- AI-driven conversation flow
- Doctor recommendation system
- Appointment booking workflow
- Real-time chat UI with animations

---

## ⚠️ IMPORTANT – WHY MOCK DATA IS USED

This project currently uses **mock AI responses instead of OpenAI API** due to:

### ❌ Reason:
- OpenAI free credits are not available
- Paid API usage is not enabled for this project

### ✅ What is mocked:
- Speech-to-text (STT)
- AI agent responses
- Text-to-speech (TTS)
- Doctor availability system
- Appointment scheduling logic

---

## 🧪 Mock System Design (How It Works)

Instead of real AI APIs, the backend simulates:

### 🎤 Speech Input
```

Frontend → Audio → Backend

```

### 🧠 AI Agent (Mock Logic)
```

Symptoms → Doctor List → Slot Selection → Booking Confirmation

```

### 📊 Example Flow

User:
“I have stomach pain”

System:
→ Suggests doctors (Gastro / Internal Medicine)
→ Shows available slots (11AM, 2PM, 4PM)
→ Confirms appointment

---

## 👨‍⚕️ Doctor System (Mock Data)

Used for UI simulation:

- Dr. Arjun Mehta → Gastroenterologist
- Dr. Sneha Reddy → General Physician
- Dr. Vikram Iyer → Internal Medicine Specialist

Each doctor is dynamically rendered in UI cards with:
- Avatar initials
- Specialty
- Clickable selection UI

---

## 📅 Slot System

Mock slots:
- 11:00 AM
- 02:00 PM
- 04:00 PM

Displayed with:
- Clock icons
- Button-based selection UI
- Responsive grid layout

---

## 💡 Why Mock Architecture is Important

This system was intentionally designed to:

✔ Simulate real production AI pipelines  
✔ Allow frontend + backend decoupling  
✔ Enable UI/UX development without API cost  
✔ Test latency handling & conversational flows  

---

## 🚀 Can This Scale to Real AI?

YES — easily.

### 🔁 Replaceable Modules:

| Module | Current | Future Upgrade |
|--------|--------|----------------|
| STT | Mock flow | Whisper API / Deepgram |
| AI Agent | Rule-based logic | GPT-4 / GPT-4o |
| TTS | Empty file stub | OpenAI TTS / ElevenLabs |
| Doctor system | Static JSON | Real hospital DB |
| Slots | Hardcoded | Calendar API |

---

## 🧠 Future Scalability Plan

This architecture can evolve into:

### 🏥 Phase 1 (Current)
- Mock AI assistant
- Simulated medical flow

### 🤖 Phase 2
- OpenAI GPT integration
- Real speech-to-text

### 🏥 Phase 3
- Hospital database integration
- Real doctor scheduling system

### 💳 Phase 4
- Payments (consultation booking)
- Video consultation system

---

## ⚙️ Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Lucide Icons
- Web Speech API

### Backend
- Node.js
- Express
- Multer (audio upload)
- Session-based agent logic

---

## 📡 API Flow

```
POST /api/voice
→ Audio Upload
→ Speech-to-Text (mock)
→ Agent Processing
→ Response JSON
→ Frontend UI rendering
```

---

## 📊 Key Features

- 🎤 Voice-based interaction
- 🧠 AI conversation simulation
- 👨‍⚕️ Doctor recommendation system
- 📅 Appointment booking flow
- 💬 Real-time chat UI
- 📱 Fully responsive design
- ⚡ Smooth loading + thinking animations

---

## 🧑‍💻 Author

Built with ❤️ by Sai Chandan Gundaboina

---

## 📌 Final Note

This project is a **production-grade UI/UX simulation of an AI healthcare assistant**, designed to be easily upgraded into a real AI system by replacing mock services with OpenAI / medical APIs.

```
