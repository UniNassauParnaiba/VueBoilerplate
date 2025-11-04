import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/dashboard.vue'),
    },
    {
      path: '/tutors',
      children: [
        { path: '', name: 'tutors.index', component: () => import('@/views/tutors/index.vue')},
        { path: 'add', name: 'tutors.add', component: () => import('@/views/tutors/add.vue')},
        { path: ':id/edit', name: 'tutors.edit', component: () => import('@/views/tutors/edit.vue')},
        { path: ':id/show', component: () => import('@/views/tutors/show.vue')},
      ]
    }
  ],
})

export default router
