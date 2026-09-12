export class ConversationManager {
  constructor() {
    this.conversations = new Map();
  }

  createConversation(conversationId, characterId, userId) {
    const conversation = {
      id: conversationId,
      characterId,
      userId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.conversations.set(conversationId, conversation);
    return conversation;
  }

  addMessage(conversationId, message) {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`);
    }

    conversation.messages.push(message);
    conversation.updatedAt = new Date();
    return conversation;
  }

  getConversation(conversationId) {
    return this.conversations.get(conversationId);
  }

  getMessages(conversationId) {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`);
    }
    return conversation.messages;
  }

  deleteConversation(conversationId) {
    return this.conversations.delete(conversationId);
  }
}
