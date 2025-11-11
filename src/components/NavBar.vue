<template>
  <div class="bg-white mb-8 shadow-md sticky top-0 z-50 border-b border-gray-100">
    <div class="w-full px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Lado esquerdo - Menu -->
        <div class="flex items-center">
          <button
            type="button"
            class="btn btn-ghost btn-circle hover:bg-gray-100 hover:scale-110 transition-all duration-300"
            @click='toggleMenu'
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
        </div>

        <!-- Centro - Logo -->
        <div class="absolute left-1/2 -translate-x-1/2">
          <a
            class="btn btn-ghost text-3xl font-bold text-black hover:text-gray-700 hover:bg-transparent hover:scale-110 transition-all duration-300 cursor-pointer"
            @click="handleGoToHome"
          >
            iServ
          </a>
        </div>

        <!-- Lado direito - Ações -->
        <div class="flex items-center gap-2">
          <button
            @click="handleSearch"
            class="btn btn-ghost btn-circle hover:bg-gray-100 hover:scale-110 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button
            @click="handleNotifications"
            class="btn btn-ghost btn-circle hover:bg-gray-100 hover:scale-110 transition-all duration-300 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <!-- Avatar do usuário -->
          <div
            @click="handleProfile"
            class="hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div class="bg-gray-200 rounded-full w-10 h-10 ring ring-gray-300 ring-offset-2 hover:ring-gray-400 flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de Notificações -->
    <NotificationsModal
      :isOpen="showNotifications"
      @close="closeNotifications"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import NotificationsModal from './NotificationsModal.vue'

const router = useRouter()
const showNotifications = ref(false)

const handleGoToHome = () => {
  router.push({ name: 'home'})
}

const emit = defineEmits(['toggle-menu'])

function toggleMenu() {
  emit('toggle-menu')
}

// Função para abrir busca
const handleSearch = () => {
  router.push('/prestadores')
}

// Função para notificações
const handleNotifications = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (!isAuthenticated) {
    router.push('/login')
    return
  }
  showNotifications.value = true
}

const closeNotifications = () => {
  showNotifications.value = false
}

// Função para perfil
const handleProfile = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  if (!isAuthenticated) {
    router.push('/login')
    return
  }

  const userRole = localStorage.getItem('userRole')
  if (userRole === 'cliente') {
    router.push('/cliente/perfil')
  } else if (userRole === 'prestador') {
    router.push('/prestador/perfil')
  }
}
</script>
