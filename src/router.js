import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Mitglieder from './views/Mitglieder.vue' // 👈 hinzufügen

const routes = [
  { path: '/', component: Home },
  { path: '/mitglieder', component: Mitglieder } // 👈 hinzufügen
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
