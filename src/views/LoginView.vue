<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-4">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">E-Mail</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Passwort</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Einloggen
        </button>
        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Auth } from 'aws-amplify'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    await Auth.signIn(email.value, password.value)
    router.push('/') // Weiterleitung nach Login
  } catch (error) {
    errorMessage.value = error.message || 'Login fehlgeschlagen'
  }
}
</script>
