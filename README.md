# Character AI Chat

A real-time character AI application with WebRTC/WebSocket support and LiveKit integration. Chat with AI-powered characters in real-time with persistent conversation history.

## Architecture

```
Your App
  ├── Conversation Object
  ├── WebRTC Connection Manager → LiveKit SDK + Token Service
  └── WebSocket Connection Manager → Character AI + Conversation Manager
```

## Features

- 🎭 Multiple AI characters with distinct personalities
- 💬 Real-time WebSocket messaging
- 🎥 WebRTC support via LiveKit
- 📝 Persistent conversation history
- 🔐 Secure token-based authentication
- 🤖 OpenAI GPT-3.5 integration
- 🌐 CORS-enabled API

## Getting Started

### Prerequisites

- Node.js 16+
- OpenAI API key
- LiveKit server (optional, for video/audio features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-character-chat.git
cd ai-character-chat
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000` and the client on `http://localhost:5173`.

## API Endpoints

### REST API

#### Generate Token
```
POST /api/token
Body: { "room": "room-name", "username": "user-name" }
Response: { "token": "jwt-token" }
```

#### Create Conversation
```
POST /api/conversations
Body: { "characterId": "sherlock", "userId": "user-123" }
Response: { "conversationId": "...", "conversation": {...} }
```

#### Get Character
```
GET /api/characters/:characterId
Response: { "id": "...", "name": "...", "description": "...", ... }
```

#### List Characters
```
GET /api/characters
Response: [{ "id": "...", "name": "...", ... }, ...]
```

### WebSocket Messages

#### Send Message
```json
{
  "type": "message",
  "conversationId": "conv-123",
  "characterId": "sherlock",
  "text": "What's this mystery?"
}
```

#### Receive Response
```json
{
  "type": "response",
  "conversationId": "conv-123",
  "text": "Elementary, my dear friend...",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Available Characters

### Sherlock Holmes
- **ID**: `sherlock`
- **Description**: A brilliant detective with sharp deduction skills
- **Avatar**: 🔍

### Dr. Watson
- **ID**: `watson`
- **Description**: A loyal companion and chronicler of adventures
- **Avatar**: 📖

### AI Assistant
- **ID**: `assistant`
- **Description**: A helpful and knowledgeable AI assistant
- **Avatar**: 🤖

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)
- `OPENAI_API_KEY`: Your OpenAI API key
- `LIVEKIT_URL`: LiveKit server URL
- `LIVEKIT_API_KEY`: LiveKit API key
- `LIVEKIT_API_SECRET`: LiveKit API secret
- `CLIENT_URL`: Client application URL (for CORS)

## Development

Run both server and client in development mode:
```bash
npm run dev
```

Run only server:
```bash
npm run dev:server
```

Run only client:
```bash
npm run dev:client
```

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
.
├── server/
│   ├── index.js                 # Main server entry point
│   ├── conversation-manager.js  # Conversation state management
│   ├── token-service.js         # LiveKit token generation
│   └── character-ai.js          # Character AI logic with OpenAI
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── App.vue
│   └── index.html
├── package.json
├── .env.example
└── README.md
```

## Technologies

- **Backend**: Express.js, WebSocket, Node.js
- **Frontend**: Vue.js 3, Vite
- **AI**: OpenAI GPT-3.5
- **Real-time**: LiveKit, WebRTC
- **Database**: In-memory (can be extended to PostgreSQL)

## License

MIT

## Support

For issues and feature requests, please open an issue on GitHub.
