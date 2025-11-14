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
    },
    {
      path: '/pets',
      children: [
        { path: '', name: 'pets.index', component: () => import('@/views/pets/index.vue')},
        { path: 'add', name: 'pets.add', component: () => import('@/views/pets/add.vue')},
        { path: ':id/edit', name: 'pets.edit', component: () => import('@/views/pets/edit.vue')},
        { path: ':id/show', component: () => import('@/views/pets/show.vue')},
      ]
    }
  ],
})

export default router
