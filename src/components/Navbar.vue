<template>
  <nav class="flex items-center justify-between bg-blue-600 p-4 text-white">
    <div class="text-lg font-bold">FFM Jugendwarte</div>
    <div class="space-x-4">
      <router-link to="/" class="hover:underline">Start</router-link>
      <router-link to="/mitglieder" class="hover:underline">Mitglieder</router-link>
      <router-link
        v-if="route.path === '/mitglieder'"
        to="/neu"
        class="hover:underline"
      >
        Neu
      </router-link>
      <button @click="logout" class="hover:underline text-red-200">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { signOut } from 'aws-amplify/auth'

const router = useRouter()
const route = useRoute()

const logout = async () => {
  await signOut()
  router.push('/login')
}
</script>
