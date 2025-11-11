import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/auth/LoginView.vue')
    },
    {
      path: '/cadastro/cliente',
      name: 'cadastro-cliente',
      component: () => import('../pages/auth/CadastroClienteView.vue')
    },
    {
      path: '/cadastro/prestador',
      name: 'cadastro-prestador',
      component: () => import('../pages/auth/CadastroPrestadorView.vue')
    },
    {
      path: '/escolher-cadastro',
      name: 'escolher-cadastro',
      component: () => import('../pages/auth/EscolherCadastroView.vue')
    },
    {
      path: '/recuperar-senha',
      name: 'recuperar-senha',
      component: () => import('../pages/auth/RecuperarSenhaView.vue')
    },
    // Rotas do Cliente
    {
      path: '/cliente/dashboard',
      name: 'cliente-dashboard',
      component: () => import('../pages/cliente/DashboardView.vue'),
      meta: { requiresAuth: true, role: 'cliente' }
    },
    {
      path: '/cliente/perfil',
      name: 'cliente-perfil',
      component: () => import('../pages/cliente/PerfilView.vue'),
      meta: { requiresAuth: true, role: 'cliente' }
    },
    {
      path: '/cliente/solicitacoes',
      name: 'cliente-solicitacoes',
      component: () => import('../pages/cliente/SolicitacoesView.vue'),
      meta: { requiresAuth: true, role: 'cliente' }
    },
    // Rotas do Prestador
    {
      path: '/prestador/dashboard',
      name: 'prestador-dashboard',
      component: () => import('../pages/prestador/DashboardView.vue'),
      meta: { requiresAuth: true, role: 'prestador' }
    },
    {
      path: '/prestador/perfil',
      name: 'prestador-perfil',
      component: () => import('../pages/prestador/PerfilView.vue'),
      meta: { requiresAuth: true, role: 'prestador' }
    },
    {
      path: '/prestador/servicos',
      name: 'prestador-servicos',
      component: () => import('../pages/prestador/ServicosView.vue'),
      meta: { requiresAuth: true, role: 'prestador' }
    },
    // Rotas Públicas
    {
      path: '/prestadores',
      name: 'prestadores',
      component: () => import('../pages/PrestadoresView.vue')
    },
    {
      path: '/prestador/:id',
      name: 'prestador-detalhes',
      component: () => import('../pages/PrestadorDetalhesView.vue')
    },
    {
      path: '/categoria/:categoria',
      name: 'categoria',
      component: () => import('../pages/CategoriaView.vue')
    },
    // Página 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundView.vue')
    }
  ]
})

// Guard de navegação para rotas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null
  const userRole = localStorage.getItem('userRole')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.role && userRole !== to.meta.role) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
