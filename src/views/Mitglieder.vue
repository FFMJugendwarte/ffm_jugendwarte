<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-blue-700 mb-4">👥 Mitgliederliste</h2>

    <!-- Filter Dropdown -->
    <div class="mb-4">
      <label class="font-semibold">Gruppe filtern:</label>
      <select v-model="filterGruppe" class="ml-2 border p-1 rounded">
        <option value="">Alle Gruppen</option>
        <option v-for="g in gruppen" :key="g" :value="g">Gruppe {{ g }}</option>
      </select>
    </div>

    <!-- Tabelle -->
    <table class="w-full table-auto border-collapse">
      <thead>
      <tr class="bg-gray-200 text-left">
        <th v-for="spalte in spalten" :key="spalte.key" class="p-2 border cursor-pointer hover:bg-gray-300" @click="sortiere(spalte.key)">
          {{ spalte.label }}
          <span v-if="sortKey === spalte.key">🔼</span>
          <span v-else-if="sortKey === '-' + spalte.key">🔽</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="mitglied in gefilterteUndSortierteMitglieder" :key="mitglied.vorname + mitglied.nachname" class="hover:bg-gray-100">
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

import { ref, onMounted, computed } from 'vue' // 💡 Import hinzugefügt!

const mitglieder = ref([])

onMounted(async () => {
  try {
    const res = await fetch('https://deine-api.amazonaws.com/mitglieder')
    mitglieder.value = await res.json()
  } catch (error) {
    console.warn("API nicht erreichbar – benutze lokale Testdaten")
    mitglieder.value = [
      {
        vorname: "Lena",
        nachname: "Schmidt",
        geburtstag: "2010-07-14",
        gruppe: 1
      },
      {
        vorname: "Tim",
        nachname: "Müller",
        geburtstag: "2009-05-20",
        gruppe: 2
      }
    ]
  }
})



const today = new Date()
const sortKey = ref('')
const filterGruppe = ref('')
const gruppen = [1, 2]

const spalten = [
  { key: 'vorname', label: 'Vorname' },
  { key: 'nachname', label: 'Nachname' },
  { key: 'geburtstag', label: 'Geburtstag' },
  { key: 'alter', label: 'Alter' },
  { key: 'tageBisGeburtstag', label: 'Tage bis Geburtstag' },
  { key: 'gruppe', label: 'Gruppe' }
]

const berechneteMitglieder = computed(() =>
    mitglieder.value.map(m => {
      const geb = new Date(m.geburtstag)
      const alter = today.getFullYear() - geb.getFullYear() - (today < new Date(today.getFullYear(), geb.getMonth(), geb.getDate()) ? 1 : 0)

      const naechsterGeb = new Date(today.getFullYear(), geb.getMonth(), geb.getDate())
      if (naechsterGeb < today) naechsterGeb.setFullYear(today.getFullYear() + 1)

      const tageBisGeburtstag = Math.ceil((naechsterGeb - today) / (1000 * 60 * 60 * 24))

      return {
        ...m,
        gruppe: parseInt(m.gruppe),
        alter,
        tageBisGeburtstag
      }
    })
)

const gefilterteUndSortierteMitglieder = computed(() => {
  let list = [...berechneteMitglieder.value]

  if (filterGruppe.value !== '') {
    list = list.filter(m => m.gruppe === parseInt(filterGruppe.value))
  }

  const key = sortKey.value.replace('-', '')
  const desc = sortKey.value.startsWith('-')

  if (key) {
    list.sort((a, b) => {
      const valA = a[key]
      const valB = b[key]
      return desc ? valB > valA ? 1 : -1 : valA > valB ? 1 : -1
    })
  }

  return list
})

function sortiere(key) {
  if (sortKey.value === key) {
    sortKey.value = '-' + key
  } else {
    sortKey.value = key
  }
}

function formatDatum(dateStr) {
  return new Date(dateStr).toLocaleDateString('de-DE')
}
</script>
