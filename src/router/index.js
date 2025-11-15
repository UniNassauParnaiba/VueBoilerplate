import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/',
      name: 'inicio',
      component: () => import('@/views/dashboard.vue'),
    },
    {
      path :'/hamburguers',      
      component: () =>import('@/views/Hamburguers.vue'),
    },

    {
      path :'/fritas',
      component: () =>import('@/views/Fritas.vue'),
    },

    {
      path :'/bebidas',
      component: () =>import('@/views/Bebidas.vue')
    },
    {
      path:'/milkshakes',
      component: () =>import('@/views/MilkShake.vue')
    },
    
  {
  path: '/carrinho',
  name: 'Carrinho',
  component: () => import('@/views/CarrinhoView.vue'),
  },
  {
  path: '/notificações'
  },
  {
  path: '/fazerlogin'
  },
]})

export default router
