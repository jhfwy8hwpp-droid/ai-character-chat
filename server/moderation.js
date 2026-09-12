/**
 * Content moderation service
 */
export class ModerationService {
  constructor(openaiClient) {
    this.client = openaiClient;
    this.bannedWords = [
      // Add banned words here
    ];
  }

  async moderateMessage(text) {
    try {
      // Check for banned words
      for (const word of this.bannedWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        if (regex.test(text)) {
          return {
            approved: false,
            reason: 'Contains banned content',
          };
        }
      }

      // Use OpenAI moderation API
      const response = await this.client.createModeration({
        input: text,
      });

      const result = response.data.results[0];
      return {
        approved: !result.flagged,
        reason: result.flagged ? 'Failed moderation check' : null,
        categories: result.categories,
      };
    } catch (error) {
      console.error('Moderation error:', error);
      // Default to approving if moderation fails
      return { approved: true, reason: null };
    }
  }
}
