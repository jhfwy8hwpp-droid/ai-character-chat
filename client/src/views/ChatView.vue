<template>
  <div class="chat-view">
    <div class="chat-container">
      <!-- Chat Header -->
      <div class="chat-header">
        <router-link to="/" class="back-btn">← Back</router-link>
        <div class="character-info" v-if="character">
          <span class="avatar">{{ character.avatar }}</span>
          <div>
            <h2>{{ character.name }}</h2>
            <p class="status" :class="{ connected: isConnected }">
              {{ isConnected ? '● Online' : '● Connecting...' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="messages-area">
        <div v-if="messages.length === 0" class="empty-state">
          <p>Start a conversation with {{ character?.name || 'the character' }}!</p>
        </div>
        <div v-for="(msg, idx) in formattedMessages" :key="idx" class="message" :class="{
          'message-user': msg.isUser,
          'message-assistant': msg.isAssistant
        }">
          <div class="message-content">{{ msg.content }}</div>
          <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
        </div>
        <div v-if="isLoading" class="message message-assistant">
          <div class="message-content loading-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="error-message">{{ error }}</div>

      <!-- Input Area -->
      <div class="input-area">
        <input
          v-model="userInput"
          @keydown.enter="sendMessage"
          type="text"
          placeholder="Type your message..."
          :disabled="!isConnected || isLoading"
          class="message-input"
        />
        <button
          @click="sendMessage"
          :disabled="!isConnected || isLoading || !userInput.trim()"
          class="send-btn"
        >
          <span v-if="isLoading">...</span>
          <span v-else>Send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConversation } from '../composables/use-conversation'

const route = useRoute()
const router = useRouter()

const userInput = ref('')
const messagesContainer = ref(null)

const {
  character,
  messages,
  formattedMessages,
  isConnected,
  isLoading,
  error,
  initializeConversation,
  sendMessage: sendConversationMessage,
  disconnect
} = useConversation()

const characterId = route.params.characterId

onMounted(async () => {
  await initializeConversation(characterId)
})

onUnmounted(() => {
  disconnect()
})

const sendMessage = async () => {
  const text = userInput.value.trim()
  if (!text) return

  userInput.value = ''
  await sendConversationMessage(text)
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    const container = messagesContainer.value
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

watch(messages, () => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-view {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.chat-container {
  width: 100%;
  max-width: 700px;
  height: 100%;
  max-height: 600px;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.back-btn {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.3s;
  cursor: pointer;
}

.back-btn:hover {
  opacity: 0.8;
}

.character-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.character-info .avatar {
  font-size: 2rem;
}

.character-info h2 {
  margin: 0;
  font-size: 1.3rem;
}

.status {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.status.connected {
  color: #4ade80;
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #f8f9fa;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #999;
}

.message {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-user {
  align-self: flex-end;
}

.message-user .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px 12px 4px 12px;
}

.message-assistant {
  align-self: flex-start;
}

.message-assistant .message-content {
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 12px 12px 12px 4px;
}

.message-content {
  max-width: 80%;
  padding: 0.75rem 1rem;
  word-wrap: break-word;
  line-height: 1.5;
}

.message-time {
  font-size: 0.75rem;
  color: #999;
  margin: 0 1rem;
}

.loading-dots {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 0.5rem 1rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #667eea;
  animation: bounce 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
  margin: 0 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border-left: 4px solid #c33;
}

.input-area {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.message-input {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.message-input:focus {
  border-color: #667eea;
}

.message-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.send-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
