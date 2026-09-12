<template>
  <div class="home-view">
    <div class="container">
      <section class="hero">
        <h2>Choose Your Character</h2>
        <p>Select an AI character to start chatting</p>
      </section>

      <div v-if="loading" class="loading">
        <p>Loading characters...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <div v-else class="characters-grid">
        <div
          v-for="char in characters"
          :key="char.id"
          class="character-card"
          @click="selectCharacter(char.id)"
        >
          <div class="avatar">{{ char.avatar }}</div>
          <h3>{{ char.name }}</h3>
          <p>{{ char.description }}</p>
          <button class="start-btn">Start Chat →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { APIClient } from '../services/api-client'

const router = useRouter()
const api = new APIClient()

const characters = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    characters.value = await api.getCharacters()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const selectCharacter = (characterId) => {
  router.push(`/chat/${characterId}`)
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  color: white;
  margin-bottom: 4rem;
}

.hero h2 {
  font-size: 2.5rem;
  margin: 0 0 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.character-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.character-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.avatar {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
}

.character-card h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
  color: #333;
}

.character-card p {
  color: #666;
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

.start-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  font-size: 1.1rem;
}

.error {
  background: rgba(220, 53, 69, 0.3);
  border: 2px solid rgba(220, 53, 69, 0.5);
}
</style>
