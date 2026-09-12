import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { ConversationManager } from './conversation-manager.js';
import { TokenService } from './token-service.js';
import { CharacterAI } from './character-ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const conversationManager = new ConversationManager();
const tokenService = new TokenService();
const characterAI = new CharacterAI();

// WebRTC Connection Manager endpoint
app.post('/api/token', async (req, res) => {
  try {
    const { room, username } = req.body;
    if (!room || !username) {
      return res.status(400).json({ error: 'Missing room or username' });
    }
    
    const token = await tokenService.generateToken(room, username);
    res.json({ token });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// Start conversation endpoint
app.post('/api/conversations', async (req, res) => {
  try {
    const { characterId, userId } = req.body;
    const conversationId = uuidv4();
    
    const conversation = conversationManager.createConversation(
      conversationId,
      characterId,
      userId
    );
    
    res.json({ conversationId, conversation });
  } catch (error) {
    console.error('Conversation creation error:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Get character info
app.get('/api/characters/:characterId', (req, res) => {
  try {
    const character = characterAI.getCharacter(req.params.characterId);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    console.error('Character retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve character' });
  }
});

// List available characters
app.get('/api/characters', (req, res) => {
  try {
    const characters = characterAI.listCharacters();
    res.json(characters);
  } catch (error) {
    console.error('Characters list error:', error);
    res.status(500).json({ error: 'Failed to list characters' });
  }
});

// WebSocket Connection Manager
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  const connectionId = uuidv4();
  console.log(`Client connected: ${connectionId}`);

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      const { type, conversationId, characterId, text } = message;

      if (type === 'message') {
        // Process user message through character AI
        const response = await characterAI.generateResponse(
          characterId,
          text,
          conversationId
        );

        // Store message in conversation
        conversationManager.addMessage(conversationId, {
          role: 'user',
          content: text,
          timestamp: new Date(),
        });

        conversationManager.addMessage(conversationId, {
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        });

        // Send response back to client
        ws.send(
          JSON.stringify({
            type: 'response',
            conversationId,
            text: response,
            timestamp: new Date(),
          })
        );
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
      ws.send(
        JSON.stringify({
          type: 'error',
          message: 'Failed to process message',
        })
      );
    }
  });

  ws.on('close', () => {
    console.log(`Client disconnected: ${connectionId}`);
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error [${connectionId}]:`, error);
  });
});
