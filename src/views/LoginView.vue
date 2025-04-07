<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-xl shadow-lg text-center">
      <h1 class="text-xl font-bold mb-4">Login</h1>
      <button
        @click="login"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Mit Cognito einloggen
      </button>
    </div>
  </div>
</template>

<script setup>
import { getUrl } from 'aws-amplify/auth'

const login = async () => {
  const { url } = await getUrl()
  window.location.href = url
}
</script>
