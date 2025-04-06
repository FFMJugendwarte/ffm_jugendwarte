import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Mitglieder from './views/Mitglieder.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/mitglieder', name: 'Mitglieder', component: Mitglieder },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
