<template>
  <nav class="bg-white shadow p-4 flex justify-between items-center">
    <router-link to="/" class="text-xl font-bold text-blue-700">Jugendwarte FF Manching</router-link>
    <ul class="flex space-x-6 text-gray-700">
      <li><router-link to="/" class="hover:text-blue-500">Start</router-link></li>
      <li><router-link to="/mitglieder" class="hover:text-blue-500">Mitglieder</router-link></li>
      <li><router-link to="/neu" class="hover:text-blue-500">➕ Neues Mitglied</router-link></li>
    </ul>
  </nav>
</template>
