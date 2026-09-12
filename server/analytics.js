/**
 * Analytics service for tracking user interactions
 */
export class AnalyticsService {
  constructor() {
    this.events = [];
    this.sessionStats = new Map();
  }

  trackEvent(event) {
    this.events.push({
      ...event,
      timestamp: new Date(),
    });

    // Keep only last 10000 events in memory
    if (this.events.length > 10000) {
      this.events = this.events.slice(-10000);
    }
  }

  trackConversation(conversationId, characterId, userId, messageCount) {
    this.trackEvent({
      type: 'conversation',
      conversationId,
      characterId,
      userId,
      messageCount,
    });
  }

  trackMessage(conversationId, characterId, messageLength) {
    this.trackEvent({
      type: 'message',
      conversationId,
      characterId,
      messageLength,
    });
  }

  trackError(error, context) {
    this.trackEvent({
      type: 'error',
      error: error.message,
      stack: error.stack,
      context,
    });
  }

  getStats(hours = 24) {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    const recentEvents = this.events.filter((e) => e.timestamp > cutoffTime);

    const stats = {
      totalEvents: recentEvents.length,
      conversations: 0,
      messages: 0,
      errors: 0,
      users: new Set(),
      characters: new Set(),
    };

    recentEvents.forEach((event) => {
      if (event.type === 'conversation') {
        stats.conversations++;
        stats.users.add(event.userId);
        stats.characters.add(event.characterId);
      } else if (event.type === 'message') {
        stats.messages++;
      } else if (event.type === 'error') {
        stats.errors++;
      }
    });

    return {
      ...stats,
      uniqueUsers: stats.users.size,
      uniqueCharacters: stats.characters.size,
    };
  }

  exportJSON() {
    return JSON.stringify(this.events, null, 2);
  }
}
