import { AccessToken } from 'livekit-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

export class TokenService {
  constructor() {
    this.apiKey = process.env.LIVEKIT_API_KEY || 'devkey';
    this.apiSecret = process.env.LIVEKIT_API_SECRET || 'secret';
  }

  async generateToken(room, username) {
    try {
      const at = new AccessToken(this.apiKey, this.apiSecret);
      at.addGrant({
        room: room,
        roomJoin: true,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
      });

      const token = at.toJwt();
      return token;
    } catch (error) {
      console.error('Token generation failed:', error);
      throw error;
    }
  }
}
