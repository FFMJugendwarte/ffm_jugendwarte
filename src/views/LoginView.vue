<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <button
      @click="login"
      class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Mit Cognito einloggen
    </button>
  </div>
</template>

<script setup>
import { Auth } from 'aws-amplify'

const login = () => {
  Auth.federatedSignIn()
}
</script>
