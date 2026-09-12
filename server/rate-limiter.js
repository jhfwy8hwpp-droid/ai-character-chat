import rateLimit from 'express-rate-limit';

/**
 * Rate limiting middleware
 */
export const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
};

/**
 * Strict rate limiter for API endpoints
 */
export const apiLimiter = createRateLimiter(15 * 60 * 1000, 100);

/**
 * Strict rate limiter for authentication endpoints
 */
export const authLimiter = createRateLimiter(15 * 60 * 1000, 5);

/**
 * WebSocket message rate limiter
 */
export class WebSocketRateLimiter {
  constructor(maxMessages = 10, windowMs = 1000) {
    this.maxMessages = maxMessages;
    this.windowMs = windowMs;
    this.clients = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    const client = this.clients.get(clientId);

    if (!client) {
      this.clients.set(clientId, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (now > client.resetTime) {
      client.count = 1;
      client.resetTime = now + this.windowMs;
      return true;
    }

    if (client.count < this.maxMessages) {
      client.count++;
      return true;
    }

    return false;
  }

  cleanup() {
    const now = Date.now();
    for (const [clientId, client] of this.clients) {
      if (now > client.resetTime + this.windowMs) {
        this.clients.delete(clientId);
      }
    }
  }
}
