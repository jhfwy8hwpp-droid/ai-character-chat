import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class CharacterAI {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.characters = new Map([
      [
        'sherlock',
        {
          id: 'sherlock',
          name: 'Sherlock Holmes',
          description: 'A brilliant detective with sharp deduction skills',
          systemPrompt:
            'You are Sherlock Holmes, a brilliant detective known for your exceptional deductive reasoning. You are analytical, sometimes condescending, but ultimately dedicated to solving mysteries. Speak in a Victorian manner and reference your detective methods.',
          avatar: '🔍',
        },
      ],
      [
        'watson',
        {
          id: 'watson',
          name: 'Dr. Watson',
          description: 'A loyal companion and chronicler of adventures',
          systemPrompt:
            'You are Dr. Watson, Sherlock Holmes\'s loyal friend and chronicler. You are practical, compassionate, and often serve as the voice of reason. You appreciate adventure and value loyalty above all.',
          avatar: '📖',
        },
      ],
      [
        'assistant',
        {
          id: 'assistant',
          name: 'AI Assistant',
          description: 'A helpful and knowledgeable AI assistant',
          systemPrompt:
            'You are a helpful, knowledgeable AI assistant. You provide accurate information, think through problems logically, and communicate clearly. You are friendly and professional.',
          avatar: '🤖',
        },
      ],
    ]);

    this.conversationHistories = new Map();
  }

  getCharacter(characterId) {
    return this.characters.get(characterId);
  }

  listCharacters() {
    return Array.from(this.characters.values());
  }

  async generateResponse(characterId, userMessage, conversationId) {
    try {
      const character = this.getCharacter(characterId);
      if (!character) {
        throw new Error(`Character ${characterId} not found`);
      }

      // Get or initialize conversation history
      let history = this.conversationHistories.get(conversationId) || [];

      // Add user message to history
      history.push({
        role: 'user',
        content: userMessage,
      });

      // Keep only last 10 messages for context
      if (history.length > 10) {
        history = history.slice(-10);
      }

      // Generate response using OpenAI
      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: character.systemPrompt,
          },
          ...history,
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const assistantMessage = response.choices[0].message.content;

      // Add assistant response to history
      history.push({
        role: 'assistant',
        content: assistantMessage,
      });

      // Store updated history
      this.conversationHistories.set(conversationId, history);

      return assistantMessage;
    } catch (error) {
      console.error('Response generation error:', error);
      throw error;
    }
  }

  clearConversationHistory(conversationId) {
    this.conversationHistories.delete(conversationId);
  }
}
