<template>
  <div :class="[
        'bg-gradient-to-b from-indigo-900 to-indigo-800 transition-all duration-300 ease-in-out overflow-hidden h-screen shadow-2xl',
        isOpen ? 'w-64' : 'w-0'
    ]">
    <div class="w-64 h-full flex flex-col py-6">
      <!-- Header do menu -->
      <div class="px-6 mb-8">
        <h2 class="text-white font-bold text-lg mb-1">Menu</h2>
        <p class="text-indigo-200 text-sm">Navegação rápida</p>
      </div>

      <!-- Links do menu -->
      <ul class="flex-1 px-3 space-y-2">
        <li>
          <router-link
            to="/"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            active-class="bg-indigo-700 shadow-lg"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="font-medium">Início</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/prestadores"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            active-class="bg-indigo-700 shadow-lg"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="font-medium">Buscar Prestadores</span>
          </router-link>
        </li>

        <li v-if="isAuthenticated && userRole === 'cliente'">
          <router-link
            to="/cliente/dashboard"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            active-class="bg-indigo-700 shadow-lg"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span class="font-medium">Meu Dashboard</span>
          </router-link>
        </li>

        <li v-if="isAuthenticated && userRole === 'cliente'">
          <router-link
            to="/cliente/solicitacoes"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            active-class="bg-indigo-700 shadow-lg"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span class="font-medium">Minhas Solicitações</span>
          </router-link>
        </li>

        <li v-if="isAuthenticated && userRole === 'prestador'">
          <router-link
            to="/prestador/dashboard"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            active-class="bg-indigo-700 shadow-lg"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span class="font-medium">Meu Dashboard</span>
          </router-link>
        </li>

        <li v-if="isAuthenticated && userRole === 'prestador'">
          <router-link
            to="/prestador/servicos"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            active-class="bg-indigo-700 shadow-lg"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="font-medium">Meus Serviços</span>
          </router-link>
        </li>

        <li v-if="!isAuthenticated">
          <router-link
            to="/login"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            active-class="bg-indigo-700 shadow-lg"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span class="font-medium">Login</span>
          </router-link>
        </li>

        <li v-if="!isAuthenticated">
          <router-link
            to="/escolher-cadastro"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-700/50 transition-all duration-200 group"
            active-class="bg-indigo-700 shadow-lg"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span class="font-medium">Cadastrar</span>
          </router-link>
        </li>
      </ul>

      <!-- Footer do menu -->
      <div class="px-6 pt-4 border-t border-indigo-700">
        <div class="flex items-center gap-3 text-indigo-200 text-sm">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Sistema online</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const isAuthenticated = ref(false)
const userRole = ref(null)

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  userRole.value = localStorage.getItem('userRole')
})
</script>
