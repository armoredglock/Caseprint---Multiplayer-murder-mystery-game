# Caseprint 🕵️‍♂️🔍

**Caseprint** is a real-time, multiplayer cooperative murder mystery game. Players join a shared lobby and work together as detectives to analyze evidence, interrogate suspects, review forensics, and ultimately agree on a verdict to catch the killer.

---

## 🎮 Features
- **Real-Time Cooperative Gameplay:** Powered by Socket.io, all players see live updates when someone joins, chats, or submits an accusation.
- **Multiple Cases:** Choose from a variety of handcrafted murder mysteries ranging in difficulty from Easy to Hard.
- **Interactive Case Files:** Sift through dynamic suspect dossiers, forensic reports, digital evidence, and interactive timelines.
- **Procedural Character Avatars:** Every suspect, victim, and witness features a unique, dynamically generated portrait.
- **Verdict System:** Discuss with your team and submit your final accusation. If everyone agrees, the real killer is revealed!

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Real-Time Engine:** Socket.io
- **Database:** MongoDB (Mongoose)

---

## 🚀 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/armoredglock/Caseprint---Multiplayer-murder-mystery-game.git
cd Caseprint---Multiplayer-murder-mystery-game
```

### 2. Setup the Backend
Open a terminal in the `server` directory:
```bash
cd server
npm install
```
Start the backend server:
```bash
node index.js
```
*(Note: The server uses an in-memory MongoDB by default for local development, so no cloud database connection is required to test!)*

### 3. Setup the Frontend
Open a new terminal in the `client` directory:
```bash
cd client
npm install
npm run dev
```

### 4. Play!
Open your browser and navigate to `http://localhost:5173`. Create a room, share the room code with a friend, and start solving the case!

---

## 📦 Deployment
The application is designed for a split-deployment architecture:
- **Frontend** should be deployed to **Vercel** (or Netlify).
- **Backend** should be deployed to **Render** (or Railway) to support persistent WebSockets.
- Ensure the backend environment uses a live `MONGODB_URI` string, and the frontend environment uses the `VITE_SERVER_URL` pointing to the live backend.
