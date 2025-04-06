import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Mitglieder from './views/Mitglieder.vue'
import MitgliedHinzufuegen from './views/MitgliedHinzufuegen.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/mitglieder', component: Mitglieder },
  { path: '/neu', component: MitgliedHinzufuegen } // ← neu
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
