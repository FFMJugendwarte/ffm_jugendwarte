<template>
  <nav class="flex items-center justify-between bg-blue-600 p-4 text-white">
    <router-link to="/" class="text-lg font-bold hover:underline">FFM Jugendwarte</router-link>
    <div class="space-x-4">
      <router-link v-if="isAuthenticated" to="/mitglieder" class="hover:underline">
        Mitglieder
      </router-link>
      <router-link
        v-if="route.path === '/mitglieder'"
        to="/neu"
        class="hover:underline"
      >
        Neu
      </router-link>
      <button
        v-if="isAuthenticated"
        @click="logout"
        class="hover:underline text-red-200"
      >
        Logout
      </button>
      <router-link v-else to="/login" class="hover:underline">
        Login
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { signOut, fetchAuthSession } from 'aws-amplify/auth'

const router = useRouter()
const route = useRoute()

const isAuthenticated = ref(false)

onMounted(async () => {
  try {
    const session = await fetchAuthSession()
    isAuthenticated.value = session.tokens !== undefined
  } catch {
    isAuthenticated.value = false
  }
})

const logout = async () => {
  await signOut()
  isAuthenticated.value = false
  router.push('/login')
}
</script>
