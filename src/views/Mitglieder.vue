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
        <th class="p-2 border text-center">✏️</th>
        <th class="p-2 border text-center">🗑️</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="mitglied in gefilterteUndSortierteMitglieder" :key="mitglied.id" class="hover:bg-gray-100">
        <td class="p-2 border">{{ mitglied.vorname }}</td>
        <td class="p-2 border">{{ mitglied.nachname }}</td>
        <td
            class="p-2 border"
            :class="{
              'text-green-600 font-semibold': mitglied.geburtstagsStatus === 'naht',
              'text-red-600 font-semibold': mitglied.geburtstagsStatus === 'gerade'
            }"
        >
          <div class="flex items-center gap-2 justify-start">
          <span>{{ formatDatum(mitglied.geburtstag) }}</span>
          <span v-if="mitglied.geburtstagsStatus === 'naht'">🎉</span>
          <span v-else-if="mitglied.geburtstagsStatus === 'gerade'">🎂</span>
          </div>
        </td>
        <td class="p-2 border">{{ mitglied.alter }}</td>
        <td class="p-2 border">{{ mitglied.tageBisGeburtstag }}</td>
        <td class="p-2 border">{{ mitglied.gruppe }}</td>
        <td class="p-2 border text-center">
          <button @click="bearbeiten(mitglied)" class="hover:text-blue-600 text-xl">✏️</button>
        </td>
        <td class="p-2 border text-center">
          <button @click="loeschen(mitglied.id)" class="hover:text-red-600 text-xl">🗑️</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Bearbeiten-Modal -->
    <div v-if="editMitglied" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative">
        <button @click="editMitglied = null" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">✖</button>
        <h3 class="text-lg font-bold mb-4">🛠️ Mitglied bearbeiten</h3>
        <form @submit.prevent="updateMitglied">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold">Vorname:</label>
              <input v-model="editMitglied.vorname" class="border p-2 w-full rounded" required />
            </div>
            <div>
              <label class="block font-semibold">Nachname:</label>
              <input v-model="editMitglied.nachname" class="border p-2 w-full rounded" required />
            </div>
            <div>
              <label class="block font-semibold">Geburtstag:</label>
              <input v-model="editMitglied.geburtstag" type="date" class="border p-2 w-full rounded" required />
            </div>
            <div>
              <label class="block font-semibold">Gruppe:</label>
              <select v-model="editMitglied.gruppe" class="border p-2 w-full rounded" required>
                <option value="1">Gruppe 1</option>
                <option value="2">Gruppe 2</option>
              </select>
            </div>
          </div>
          <div class="mt-6 text-right">
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">💾 Speichern</button>
            <button @click="editMitglied = null" type="button" class="ml-2 text-gray-600 hover:underline">Abbrechen</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const mitglieder = ref([])
const editMitglied = ref(null)
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

onMounted(ladeMitgliederNeu)

async function ladeMitgliederNeu() {
  try {
    const res = await fetch('https://szu69fnk74.execute-api.eu-central-1.amazonaws.com/mitglieder')
    mitglieder.value = await res.json()
  } catch (error) {
    console.warn("API nicht erreichbar – benutze lokale Testdaten")
    mitglieder.value = []
  }
}

const berechneteMitglieder = computed(() =>
    mitglieder.value.map(m => {
      const geb = new Date(m.geburtstag)
      const alter = today.getFullYear() - geb.getFullYear() - (today < new Date(today.getFullYear(), geb.getMonth(), geb.getDate()) ? 1 : 0)
      const naechsterGeb = new Date(today.getFullYear(), geb.getMonth(), geb.getDate())
      if (naechsterGeb < today) naechsterGeb.setFullYear(today.getFullYear() + 1)
      const tageBisGeburtstag = Math.ceil((naechsterGeb - today) / (1000 * 60 * 60 * 24))
      const geburtstagsStatus =
          tageBisGeburtstag <= 28 ? 'naht' :
              tageBisGeburtstag > 337 ? 'gerade' : ''
      return {
        ...m,
        gruppe: parseInt(m.gruppe),
        alter,
        tageBisGeburtstag,
        geburtstagsStatus
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
      const valA = a[key], valB = b[key]
      return desc ? valB > valA ? 1 : -1 : valA > valB ? 1 : -1
    })
  }
  return list
})

function sortiere(key) {
  sortKey.value = sortKey.value === key ? '-' + key : key
}

function formatDatum(dateStr) {
  return new Date(dateStr).toLocaleDateString('de-DE')
}

function bearbeiten(mitglied) {
  editMitglied.value = { ...mitglied }
}

async function updateMitglied() {
  try {
    const res = await fetch("https://szu69fnk74.execute-api.eu-central-1.amazonaws.com/mitglieder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editMitglied.value)
    })
    const data = await res.json()
    if (res.ok) {
      alert("✅ Mitglied aktualisiert!")
      editMitglied.value = null
      await ladeMitgliederNeu()
    } else {
      alert("❌ Fehler beim Speichern: " + (data.message || "Unbekannter Fehler"))
    }
  } catch (err) {
    alert("❌ Netzwerkfehler")
    console.error(err)
  }
}

async function loeschen(id) {
  if (!confirm("Soll das Mitglied wirklich gelöscht werden?")) return
  try {
    const res = await fetch(`https://szu69fnk74.execute-api.eu-central-1.amazonaws.com/mitglieder/${id}`, {
      method: "DELETE"
    })
    const data = await res.json()
    if (res.ok) {
      alert("🗑️ Mitglied gelöscht!")
      await ladeMitgliederNeu()
    } else {
      alert("❌ Fehler beim Löschen: " + (data.message || "Unbekannter Fehler"))
    }
  } catch (err) {
    alert("❌ Netzwerkfehler beim Löschen")
    console.error(err)
  }
}
</script>
