<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-blue-700 mb-4">👥 Mitgliederliste</h2>
    <table class="w-full table-auto border-collapse">
      <thead>
      <tr class="bg-gray-200 text-left">
        <th class="p-2 border">Vorname</th>
        <th class="p-2 border">Nachname</th>
        <th class="p-2 border">Geburtstag</th>
        <th class="p-2 border">Alter</th>
        <th class="p-2 border">Tage bis Geburtstag</th>
        <th class="p-2 border">Gruppe</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="mitglied in berechneteMitglieder" :key="mitglied.vorname + mitglied.nachname" class="hover:bg-gray-100">
        <td class="p-2 border">{{ mitglied.vorname }}</td>
        <td class="p-2 border">{{ mitglied.nachname }}</td>
        <td class="p-2 border">{{ formatDatum(mitglied.geburtstag) }}</td>
        <td class="p-2 border">{{ mitglied.alter }}</td>
        <td class="p-2 border">{{ mitglied.tageBisGeburtstag }}</td>
        <td class="p-2 border">{{ mitglied.gruppe }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const mitglieder = [
  { vorname: 'Lena', nachname: 'Schmidt', geburtstag: '2010-07-14', gruppe: 2 },
  { vorname: 'Jonas', nachname: 'Müller', geburtstag: '2008-11-23', gruppe: 1 },
  { vorname: 'Mia', nachname: 'Hofmann', geburtstag: '2011-05-11', gruppe: 3 },
]

const today = new Date()

const berechneteMitglieder = computed(() =>
    mitglieder.map(m => {
      const geb = new Date(m.geburtstag)
      const alter = today.getFullYear() - geb.getFullYear() - (today < new Date(today.getFullYear(), geb.getMonth(), geb.getDate()) ? 1 : 0)

      const naechsterGeb = new Date(today.getFullYear(), geb.getMonth(), geb.getDate())
      if (naechsterGeb < today) naechsterGeb.setFullYear(today.getFullYear() + 1)

      const diffTime = naechsterGeb - today
      const tageBisGeburtstag = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      return {
        ...m,
        alter,
        tageBisGeburtstag
      }
    })
)

const formatDatum = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('de-DE')
}
</script>
