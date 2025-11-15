import { createRouter, createWebHistory } from 'vue-router'
import Board from './components/Board.vue'
import Login from './Login.vue'

const routes = [
  {
    path: '/',
    name: 'Board',
    component: Board,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
    
    const isLoggedIn = !!sessionStorage.getItem('loggedInUser')

    if (isLoggedIn) {
      next() 
    } else {
      alert('Você precisa estar logado para ver o quadro.')
      next('/login')
    }
  } else {
    next()
  }
})

export default router