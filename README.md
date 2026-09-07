# Caseprint

Caseprint is a real-time, multiplayer cooperative murder mystery game. Players join a shared session and work together to analyze evidence, interrogate suspects, and determine a verdict.

## Features

- **Real-Time Multiplayer:** Built on Socket.io for synchronized state across all connected clients.
- **Dynamic Case Data:** Multiple cases with varying difficulty levels loaded from the backend.
- **Interactive Evidence:** UI components for suspect dossiers, forensic reports, digital evidence, and timelines.
- **Procedural Avatars:** Characters utilize dynamically generated portraits based on seeded data.
- **Verdict System:** A consensus-based voting mechanism to conclude the game session.

## Tech Stack

- **Client:** React (Vite), Tailwind CSS
- **Server:** Node.js, Express
- **Real-Time:** Socket.io
- **Database:** MongoDB (Mongoose)

## Local Development

### Prerequisites

- Node.js (v16+)
- MongoDB (optional for local development, as the project defaults to an in-memory database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/armoredglock/Caseprint---Multiplayer-murder-mystery-game.git
   cd Caseprint---Multiplayer-murder-mystery-game
   ```

2. Start the backend server:
   ```bash
   cd server
   npm install
   node index.js
   ```

3. Start the frontend client (in a separate terminal):
   ```bash
   cd client
   npm install
   npm run dev
   ```

The client will be available at `http://localhost:5173`.

## Deployment

The application is structured for a split-deployment model:

1. **Frontend:** Deploy the `client` directory to a static hosting provider (e.g., Vercel, Netlify). Ensure `VITE_SERVER_URL` is configured to point to the backend URL.
2. **Backend:** Deploy the `server` directory to a Node.js hosting provider that supports WebSockets (e.g., Render, Railway). Set the `MONGODB_URI` environment variable to a valid MongoDB cluster connection string.
