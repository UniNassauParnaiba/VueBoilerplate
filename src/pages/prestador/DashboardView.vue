<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header do Dashboard -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Olá, {{ user.nome }}! 💼</h1>
            <p class="text-gray-600 mt-1">{{ user.categoria }} • Seu desempenho hoje</p>
          </div>
          <div class="flex items-center gap-4">
            <router-link
              to="/prestador/perfil"
              class="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Meu Perfil
            </router-link>
            <button
              @click="handleLogout"
              class="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Alerta de Verificação -->
      <div v-if="!user.verificado" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <div>
            <h3 class="text-sm font-medium text-yellow-800">Perfil em Verificação</h3>
            <p class="text-sm text-yellow-700 mt-1">Sua conta está em processo de verificação. Isso pode levar até 48 horas.</p>
          </div>
        </div>
      </div>

      <!-- Cards de Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- Solicitações Pendentes -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Pendentes</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.pendentes }}</p>
            </div>
            <div class="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
              <svg class="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Em Andamento -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Em Andamento</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.emAndamento }}</p>
            </div>
            <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Concluídos (Mês) -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Concluídos (Mês)</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.concluidos }}</p>
            </div>
            <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Avaliação Média -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Avaliação</p>
              <div class="flex items-baseline gap-1 mt-2">
                <p class="text-3xl font-bold text-gray-900">{{ stats.avaliacao.toFixed(1) }}</p>
                <span class="text-yellow-500">★</span>
              </div>
            </div>
            <div class="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="w-7 h-7 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Coluna Esquerda - Solicitações -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Novas Solicitações -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">Novas Solicitações</h2>
              <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                {{ novasSolicitacoes.length }} nova(s)
              </span>
            </div>

            <div v-if="novasSolicitacoes.length > 0" class="space-y-4">
              <div
                v-for="solicitacao in novasSolicitacoes"
                :key="solicitacao.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1">{{ solicitacao.titulo }}</h3>
                    <p class="text-sm text-gray-600 mb-2">{{ solicitacao.descricao }}</p>
                    <div class="flex items-center gap-2 text-sm text-gray-500">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {{ solicitacao.cliente }}
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-900">R$ {{ solicitacao.orcamento }}</p>
                    <p class="text-xs text-gray-500">{{ solicitacao.data }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {{ solicitacao.localizacao }}
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ solicitacao.urgencia }}
                  </div>
                </div>

                <div class="flex gap-2">
                  <button
                    class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
                  >
                    Aceitar Solicitação
                  </button>
                  <button
                    class="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all"
                  >
                    Recusar
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p class="text-gray-500">Nenhuma nova solicitação no momento</p>
            </div>
          </div>

          <!-- Serviços em Andamento -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Serviços em Andamento</h2>

            <div v-if="servicosAndamento.length > 0" class="space-y-4">
              <div
                v-for="servico in servicosAndamento"
                :key="servico.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ servico.titulo }}</h3>
                    <p class="text-sm text-gray-600">Cliente: {{ servico.cliente }}</p>
                  </div>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    Em Andamento
                  </span>
                </div>

                <div class="mb-3">
                  <div class="flex items-center justify-between text-sm mb-1">
                    <span class="text-gray-600">Progresso</span>
                    <span class="font-semibold text-gray-900">{{ servico.progresso }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-blue-600 h-2 rounded-full transition-all"
                      :style="{ width: `${servico.progresso}%` }"
                    ></div>
                  </div>
                </div>

                <div class="flex gap-2">
                  <button
                    class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
                  >
                    Atualizar Status
                  </button>
                  <button
                    class="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all"
                  >
                    Contatar Cliente
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8">
              <p class="text-gray-500">Nenhum serviço em andamento</p>
            </div>
          </div>
        </div>

        <!-- Coluna Direita - Perfil e Ações -->
        <div class="space-y-6">
          <!-- Resumo do Perfil -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                {{ user.nome.charAt(0) }}
              </div>
              <h3 class="font-semibold text-gray-900">{{ user.nome }}</h3>
              <p class="text-sm text-gray-600">{{ user.categoria }}</p>

              <div class="flex items-center justify-center gap-1 mt-2">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.round(stats.avaliacao) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm text-gray-600 ml-1">({{ stats.totalAvaliacoes }} avaliações)</span>
              </div>
            </div>

            <div class="space-y-3 border-t pt-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Taxa de Aceitação</span>
                <span class="font-semibold text-gray-900">95%</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Serviços Completos</span>
                <span class="font-semibold text-gray-900">147</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Tempo de Resposta</span>
                <span class="font-semibold text-gray-900">2h</span>
              </div>
            </div>

            <router-link
              to="/prestador/perfil"
              class="block w-full mt-6 bg-gray-900 text-white py-2 rounded-lg text-center font-semibold hover:bg-gray-800 transition-all"
            >
              Ver Perfil Completo
            </router-link>
          </div>

          <!-- Ganhos do Mês -->
          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold">Ganhos deste Mês</h3>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-4xl font-bold mb-2">R$ 4.850,00</p>
            <p class="text-green-100 text-sm">+15% em relação ao mês passado</p>
          </div>

          <!-- Ações Rápidas -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div class="space-y-2">
              <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-all border border-gray-200 flex items-center gap-3">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="font-medium text-gray-900">Adicionar Serviço</span>
              </button>
              <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-all border border-gray-200 flex items-center gap-3">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="font-medium text-gray-900">Ver Relatórios</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  nome: 'Prestador',
  categoria: 'Eletricista',
  verificado: false
})

const stats = ref({
  pendentes: 3,
  emAndamento: 2,
  concluidos: 12,
  avaliacao: 4.8,
  totalAvaliacoes: 47
})

const novasSolicitacoes = ref([
  {
    id: 1,
    titulo: 'Instalação de Ventilador de Teto',
    descricao: 'Preciso instalar 2 ventiladores de teto na sala e quarto',
    cliente: 'Ana Paula Silva',
    orcamento: '180,00',
    data: 'Há 2 horas',
    localizacao: 'Centro, 3.2km',
    urgencia: 'Normal'
  },
  {
    id: 2,
    titulo: 'Troca de Tomadas e Interruptores',
    descricao: 'Trocar todas as tomadas e interruptores do apartamento',
    cliente: 'Roberto Costa',
    orcamento: '350,00',
    data: 'Há 5 horas',
    localizacao: 'Jardim América, 5.8km',
    urgencia: 'Urgente'
  }
])

const servicosAndamento = ref([
  {
    id: 1,
    titulo: 'Instalação Elétrica Residencial',
    cliente: 'Maria Santos',
    progresso: 65
  },
  {
    id: 2,
    titulo: 'Manutenção Quadro Elétrico',
    cliente: 'João Silva',
    progresso: 30
  }
])

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    const parsedUser = JSON.parse(userData)
    user.value = {
      nome: parsedUser.nome || 'Prestador',
      categoria: parsedUser.categoria || 'Prestador de Serviços',
      verificado: parsedUser.verificado || false
    }
  }
})

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('userRole')
  localStorage.removeItem('isAuthenticated')
  router.push({ name: 'home' })
}
</script>
