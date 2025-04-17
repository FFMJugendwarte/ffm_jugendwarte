<template>
  <div class="min-h-screen pb-16 flex flex-col">
    <!-- Seiteninhalt -->
    <RouterView class="flex-grow" />

    <!-- Bottom Navigation -->
    <MobileBottomNav v-if="isMobile" />
  </div>
</template>

<script setup>
import { useScreen } from '@/composables/useScreen'
import MobileBottomNav from '@/components/MobileBottomNav.vue'

const { isMobile } = useScreen()
</script>
