import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/dashboard.vue')
    },
      {
      path: '/saved',
      name: 'Salvos',
      component: () => import('@/pages/dashboard.vue')
    },
      {
      path: '/completed',
      name: 'Finalizados',
      component: () => import('@/pages/dashboard.vue')
    },
      {
      path: '/',
      name: 'home',
      component: () => import('@/pages/dashboard.vue')
    },

  ],
})

export default router
