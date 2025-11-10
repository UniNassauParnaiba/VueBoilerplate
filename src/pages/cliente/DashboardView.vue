<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header do Dashboard -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Olá, {{ userName }}! 👋</h1>
            <p class="text-gray-600 mt-1">Bem-vindo ao seu painel de controle</p>
          </div>
          <button @click="handleLogout" class="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            Sair
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Cards de Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Card 1 -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Serviços Ativos</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.servicosAtivos }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Concluídos</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.servicosConcluidos }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Orçamentos Pendentes</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.orcamentosPendentes }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Coluna Principal -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Serviços Recentes -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">Serviços Recentes</h2>
              <router-link to="/cliente/solicitacoes" class="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Ver todos →
              </router-link>
            </div>

            <div class="space-y-4">
              <div v-for="servico in servicosRecentes" :key="servico.id" class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="font-semibold text-gray-900">{{ servico.titulo }}</h3>
                      <span :class="getStatusClass(servico.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                        {{ servico.status }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">{{ servico.descricao }}</p>
                    <div class="flex items-center gap-4 text-sm text-gray-500">
                      <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {{ servico.prestador }}
                      </span>
                      <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {{ servico.data }}
                      </span>
                    </div>
                  </div>
                  <button class="text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div v-if="servicosRecentes.length === 0" class="text-center py-12">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p class="text-gray-500 mb-4">Você ainda não tem serviços solicitados</p>
                <router-link to="/" class="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Buscar Prestadores
                </router-link>
              </div>
            </div>
          </div>

          <!-- Ações Rápidas -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
            <div class="grid grid-cols-2 gap-4">
              <router-link to="/" class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors group">
                <div class="w-10 h-10 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span class="font-semibold text-gray-900">Buscar Serviços</span>
              </router-link>

              <router-link to="/cliente/perfil" class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors group">
                <div class="w-10 h-10 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span class="font-semibold text-gray-900">Meu Perfil</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Perfil Resumido -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="text-center">
              <div class="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {{ userInitials }}
              </div>
              <h3 class="font-bold text-gray-900 mb-1">{{ userName }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ userEmail }}</p>
              <router-link to="/cliente/perfil" class="block w-full py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
                Ver Perfil Completo
              </router-link>
            </div>
          </div>

          <!-- Dicas -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6">
            <div class="flex items-start gap-3 mb-4">
              <div class="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Dica do Dia</h3>
                <p class="text-sm text-gray-700">
                  Sempre verifique as avaliações e o perfil dos prestadores antes de contratar. Isso garante mais segurança!
                </p>
              </div>
            </div>
          </div>

          <!-- Suporte -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h3 class="font-bold text-gray-900 mb-4">Precisa de Ajuda?</h3>
            <div class="space-y-3">
              <a href="#" class="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm">Central de Ajuda</span>
              </a>
              <a href="#" class="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">Fale Conosco</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref(null)

const stats = ref({
  servicosAtivos: 2,
  servicosConcluidos: 5,
  orcamentosPendentes: 3
})

const servicosRecentes = ref([
  {
    id: 1,
    titulo: 'Instalação Elétrica',
    descricao: 'Instalação de tomadas e interruptores na sala',
    prestador: 'João Silva',
    status: 'Em andamento',
    data: '15/11/2025'
  },
  {
    id: 2,
    titulo: 'Reparo de Encanamento',
    descricao: 'Vazamento no banheiro',
    prestador: 'Maria Santos',
    status: 'Aguardando',
    data: '14/11/2025'
  }
])

const userName = computed(() => {
  if (user.value) {
    return user.value.nome.split(' ')[0]
  }
  return 'Cliente'
})

const userEmail = computed(() => {
  return user.value?.email || ''
})

const userInitials = computed(() => {
  if (user.value) {
    const names = user.value.nome.split(' ')
    return names[0][0] + (names[1]?.[0] || '')
  }
  return 'CL'
})

const getStatusClass = (status) => {
  const classes = {
    'Em andamento': 'bg-blue-100 text-blue-800',
    'Aguardando': 'bg-yellow-100 text-yellow-800',
    'Concluído': 'bg-green-100 text-green-800',
    'Cancelado': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('userRole')
  localStorage.removeItem('isAuthenticated')
  router.push({ name: 'login' })
}

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})
</script>
