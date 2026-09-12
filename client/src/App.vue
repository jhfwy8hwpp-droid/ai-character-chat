<template>
  <div class="app">
    <header class="app-header">
      <h1>🤖 Character AI Chat</h1>
      <p>Conversations with AI personalities</p>
    </header>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.app-header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.app-header p {
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
}
</style>
