import { ref, computed } from 'vue'
import { WebSocketManager } from './websocket-manager'
import { APIClient } from './api-client'

export function useConversation() {
  const api = new APIClient()
  const ws = new WebSocketManager()

  const conversationId = ref(null)
  const characterId = ref(null)
  const character = ref(null)
  const messages = ref([])
  const isConnecting = ref(false)
  const isConnected = ref(false)
  const isLoading = ref(false)
  const error = ref(null)

  const formattedMessages = computed(() => {
    return messages.value.map((msg) => ({
      ...msg,
      isUser: msg.role === 'user',
      isAssistant: msg.role === 'assistant'
    }))
  })

  const initializeConversation = async (selectedCharacterId, userId = 'user-123') => {
    try {
      isConnecting.value = true
      error.value = null

      // Fetch character info
      character.value = await api.getCharacter(selectedCharacterId)
      characterId.value = selectedCharacterId

      // Create conversation
      const { conversationId: convId } = await api.createConversation(
        selectedCharacterId,
        userId
      )
      conversationId.value = convId

      // Connect WebSocket
      await ws.connect()
      isConnected.value = true

      // Listen for responses
      ws.on('response', (data) => {
        messages.value.push({
          role: 'assistant',
          content: data.text,
          timestamp: data.timestamp
        })
        isLoading.value = false
      })

      ws.on('error', (data) => {
        error.value = data.message
        isLoading.value = false
      })
    } catch (err) {
      error.value = err.message
      console.error('Initialization error:', err)
    } finally {
      isConnecting.value = false
    }
  }

  const sendMessage = async (text) => {
    if (!text.trim() || !isConnected.value) return

    try {
      isLoading.value = true
      error.value = null

      // Add user message locally
      messages.value.push({
        role: 'user',
        content: text,
        timestamp: new Date().toISOString()
      })

      // Send through WebSocket
      ws.send({
        type: 'message',
        conversationId: conversationId.value,
        characterId: characterId.value,
        text
      })
    } catch (err) {
      error.value = err.message
      isLoading.value = false
    }
  }

  const disconnect = () => {
    ws.disconnect()
    isConnected.value = false
  }

  return {
    conversationId,
    characterId,
    character,
    messages,
    formattedMessages,
    isConnecting,
    isConnected,
    isLoading,
    error,
    initializeConversation,
    sendMessage,
    disconnect
  }
}
