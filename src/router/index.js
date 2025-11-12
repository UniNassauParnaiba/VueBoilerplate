import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/inicio',
      component: () => import('@/views/dashboard.vue'),
    },
    ///atualizar futuramente onde vai ter a parte de suporte tendo contatos da empresa cnpj email e endereço
    {
      path: '/cardapio',
      children: [
        { path: '', component: () => import('@/views/tutors/index.vue') },
        { path: 'add', name: 'tutors.add', component: () => import('@/views/tutors/add.vue') },
        { path: ':id/edit', component: () => import('@/views/tutors/edit.vue') },
        { path: ':id/show', component: () => import('@/views/tutors/show.vue') },
      ],
    },
    
  {
  path: '/carrinho',
  name: 'Carrinho',
  component: () => import('@/views/CarrinhoView.vue'),
}


  ],
})

export default router
