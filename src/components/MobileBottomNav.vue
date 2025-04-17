<template>
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex justify-around p-2 z-50">
      <RouterLink to="/members" class="flex flex-col items-center text-sm" :class="{ 'text-blue-600': isActive('/members') }">
        <span class="material-icons">group</span>
        Mitglieder
      </RouterLink>
      <RouterLink to="/groups" class="flex flex-col items-center text-sm" :class="{ 'text-blue-600': isActive('/groups') }">
        <span class="material-icons">groups</span>
        Gruppen
      </RouterLink>
      <RouterLink to="/settings" class="flex flex-col items-center text-sm" :class="{ 'text-blue-600': isActive('/settings') }">
        <span class="material-icons">settings</span>
        Einstellungen
      </RouterLink>
    </nav>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  function isActive(path) {
    return route.path.startsWith(path)
  }
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  </style>
  