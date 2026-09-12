export class APIClient {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getCharacters() {
    return this.request('/characters')
  }

  async getCharacter(characterId) {
    return this.request(`/characters/${characterId}`)
  }

  async createConversation(characterId, userId) {
    return this.request('/conversations', {
      method: 'POST',
      body: JSON.stringify({ characterId, userId })
    })
  }

  async generateToken(room, username) {
    return this.request('/token', {
      method: 'POST',
      body: JSON.stringify({ room, username })
    })
  }
}
