<template>
  <div class="p-6 max-w-lg mx-auto">
    <h2 class="text-2xl font-bold text-blue-700 mb-4">➕ Neues Mitglied hinzufügen</h2>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block font-semibold">Vorname:</label>
        <input v-model="mitglied.vorname" type="text" class="border p-2 w-full rounded" required />
      </div>

      <div>
        <label class="block font-semibold">Nachname:</label>
        <input v-model="mitglied.nachname" type="text" class="border p-2 w-full rounded" required />
      </div>

      <div>
        <label class="block font-semibold">Geburtstag:</label>
        <Datepicker
            v-model="mitglied.geburtstag"
            locale="de"
            :format="formatDate"
            :enable-time-picker="false"
            required
            input-class-name="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label class="block font-semibold">Gruppe:</label>
        <select v-model="mitglied.gruppe" class="border p-2 w-full rounded" required>
          <option disabled value="">Bitte wählen</option>
          <option value="1">Gruppe 1</option>
          <option value="2">Gruppe 2</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Speichern</button>

      <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const mitglied = ref({
  vorname: '',
  nachname: '',
  geburtstag: null,
  gruppe: ''
})

const message = ref('')
const error = ref('')

function formatDate(date) {
  return date.toLocaleDateString('de-DE') // Anzeigeformat dd.mm.yyyy
}

function formatGeburtstagForApi(date) {
  return date.toISOString().split('T')[0] // yyyy-mm-dd für DynamoDB
}

async function submitForm() {
  message.value = ''
  error.value = ''

  if (!mitglied.value.geburtstag) {
    error.value = 'Bitte Geburtstag auswählen.'
    return
  }

  const payload = {
    id: Date.now().toString(),
    vorname: mitglied.value.vorname,
    nachname: mitglied.value.nachname,
    geburtstag: formatGeburtstagForApi(mitglied.value.geburtstag),
    gruppe: parseInt(mitglied.value.gruppe)
  }

  try {
    const res = await fetch('https://szu69fnk74.execute-api.eu-central-1.amazonaws.com/mitglieder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()
    if (res.ok) {
      message.value = '✅ Mitglied erfolgreich gespeichert!'
      mitglied.value = { vorname: '', nachname: '', geburtstag: null, gruppe: '' }
    } else {
      error.value = `❌ Fehler: ${data.message || 'Unbekannter Fehler'}`
    }
  } catch (err) {
    error.value = '❌ Netzwerkfehler oder API nicht erreichbar.'
    console.error(err)
  }
}
</script>
