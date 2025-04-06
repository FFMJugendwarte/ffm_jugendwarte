import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Mitglieder from './views/Mitglieder.vue'
import MitgliedHinzufuegen from './views/MitgliedHinzufuegen.vue'
import LoginView from './views/LoginView.vue'
import { getCurrentUser } from 'aws-amplify/auth' // ✅ richtig für v6+

const routes = [
  { path: '/', component: Home },
  { path: '/mitglieder', component: Mitglieder, meta: { requiresAuth: true } },
  { path: '/neu', component: MitgliedHinzufuegen, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const user = await getCurrentUser()
      if (user) next()
    } catch (err) {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
