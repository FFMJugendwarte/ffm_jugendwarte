import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Mitglieder from './views/Mitglieder.vue'
import MitgliedHinzufuegen from './views/MitgliedHinzufuegen.vue'
import LoginView from './views/LoginView.vue'
import { Auth } from 'aws-amplify' // ⬅ für Auth-Check (optional)

// Routen definieren
const routes = [
  { path: '/', component: Home },
  { path: '/mitglieder', component: Mitglieder, meta: { requiresAuth: true } }, // ⬅ geschützt
  { path: '/neu', component: MitgliedHinzufuegen, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView }
]

// Router erzeugen
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Optionaler Auth-Check für geschützte Routen
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await Auth.currentAuthenticatedUser()
      next()
    } catch {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
