<template>
    <div class="p-4 space-y-4">
      <div
        v-for="member in members"
        :key="member.id"
        class="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2"
      >
        <div class="text-xl font-semibold">
          {{ member.vorname }} {{ member.name }}
        </div>
        <div class="text-sm text-gray-600">
          👶 {{ formatBirthday(member.geburtstag) }} ({{ calculateAge(member.geburtstag) }} Jahre)
        </div>
        <div class="text-sm text-gray-600">
          🕓 Noch {{ daysUntilBirthday(member.geburtstag) }} Tage bis zum Geburtstag
        </div>
        <div class="text-sm text-gray-600">
          👥 Gruppe: {{ member.gruppe }}
        </div>
  
        <div class="flex justify-end gap-2 pt-2">
          <button @click="edit(member)" class="text-blue-600 hover:underline">Bearbeiten</button>
          <button @click="remove(member.id)" class="text-red-600 hover:underline">Löschen</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import dayjs from 'dayjs'
  
  const props = defineProps({
    members: Array,
  })
  
  const emit = defineEmits(['edit', 'remove'])
  
  function calculateAge(dob) {
    return dayjs().diff(dayjs(dob), 'year')
  }
  
  function daysUntilBirthday(dob) {
    const today = dayjs()
    let nextBirthday = dayjs(dob).year(today.year())
    if (nextBirthday.isBefore(today)) {
      nextBirthday = nextBirthday.add(1, 'year')
    }
    return nextBirthday.diff(today, 'day')
  }
  
  function formatBirthday(dob) {
    return dayjs(dob).format('DD.MM.YYYY')
  }
  
  function edit(member) {
    emit('edit', member)
  }
  
  function remove(id) {
    emit('remove', id)
  }
  </script>
  