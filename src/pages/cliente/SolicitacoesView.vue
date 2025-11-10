<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <router-link
              to="/cliente/dashboard"
              class="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </router-link>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Minhas Solicitações</h1>
              <p class="text-gray-600 mt-1">Acompanhe o status dos seus serviços</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Filtros -->
      <div class="bg-white rounded-xl shadow-md p-4 mb-6">
        <div class="flex flex-wrap gap-3">
          <button
            v-for="filtro in filtros"
            :key="filtro.value"
            @click="filtroAtivo = filtro.value"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all',
              filtroAtivo === filtro.value
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ filtro.label }}
            <span
              v-if="filtro.count > 0"
              :class="[
                'ml-2 px-2 py-0.5 rounded-full text-xs font-semibold',
                filtroAtivo === filtro.value
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-200 text-gray-700'
              ]"
            >
              {{ filtro.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Lista de Solicitações -->
      <div v-if="solicitacoesFiltradas.length > 0" class="space-y-4">
        <div
          v-for="solicitacao in solicitacoesFiltradas"
          :key="solicitacao.id"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
        >
          <div class="p-6">
            <!-- Header do Card -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold text-gray-900">{{ solicitacao.servico }}</h3>
                  <span
                    :class="{
                      'bg-yellow-100 text-yellow-800': solicitacao.status === 'pendente',
                      'bg-blue-100 text-blue-800': solicitacao.status === 'aceito',
                      'bg-purple-100 text-purple-800': solicitacao.status === 'em-andamento',
                      'bg-green-100 text-green-800': solicitacao.status === 'concluido',
                      'bg-red-100 text-red-800': solicitacao.status === 'cancelado'
                    }"
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ solicitacao.statusText }}
                  </span>
                </div>
                <p class="text-gray-600">Prestador: <span class="font-medium">{{ solicitacao.prestador }}</span></p>
              </div>

              <div class="text-right">
                <p class="text-2xl font-bold text-gray-900">R$ {{ solicitacao.valor }}</p>
                <p class="text-sm text-gray-500">{{ solicitacao.data }}</p>
              </div>
            </div>

            <!-- Descrição -->
            <p class="text-gray-700 mb-4">{{ solicitacao.descricao }}</p>

            <!-- Informações Adicionais -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p class="text-xs text-gray-500 mb-1">Data Agendada</p>
                <p class="text-sm font-medium text-gray-900">{{ solicitacao.dataAgendada }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Horário</p>
                <p class="text-sm font-medium text-gray-900">{{ solicitacao.horario }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Localização</p>
                <p class="text-sm font-medium text-gray-900">{{ solicitacao.localizacao }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">ID da Solicitação</p>
                <p class="text-sm font-medium text-gray-900">#{{ solicitacao.id }}</p>
              </div>
            </div>

            <!-- Barra de Progresso (apenas para em andamento) -->
            <div v-if="solicitacao.status === 'em-andamento'" class="mb-4">
              <div class="flex items-center justify-between text-sm mb-2">
                <span class="text-gray-600">Progresso do Serviço</span>
                <span class="font-semibold text-gray-900">{{ solicitacao.progresso }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${solicitacao.progresso}%` }"
                ></div>
              </div>
            </div>

            <!-- Ações -->
            <div class="flex flex-wrap gap-3">
              <!-- Ações por Status -->
              <template v-if="solicitacao.status === 'pendente'">
                <button class="flex-1 min-w-[150px] bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all">
                  Cancelar Solicitação
                </button>
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Editar
                </button>
              </template>

              <template v-if="solicitacao.status === 'aceito'">
                <button class="flex-1 min-w-[150px] bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  Contatar Prestador
                </button>
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Ver Detalhes
                </button>
              </template>

              <template v-if="solicitacao.status === 'em-andamento'">
                <button class="flex-1 min-w-[150px] bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all">
                  Marcar como Concluído
                </button>
                <button class="flex-1 min-w-[150px] bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-all">
                  Mensagens
                </button>
              </template>

              <template v-if="solicitacao.status === 'concluido'">
                <button
                  v-if="!solicitacao.avaliado"
                  class="flex-1 min-w-[150px] bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all"
                >
                  Avaliar Serviço
                </button>
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Ver Detalhes
                </button>
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Contratar Novamente
                </button>
              </template>

              <template v-if="solicitacao.status === 'cancelado'">
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Ver Motivo
                </button>
              </template>
            </div>
          </div>

          <!-- Avaliação (se houver) -->
          <div v-if="solicitacao.avaliacao" class="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-gray-900 mb-1">Sua avaliação</p>
                <div class="flex items-center gap-1 mb-2">
                  <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= solicitacao.avaliacao.nota ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p class="text-sm text-gray-700">{{ solicitacao.avaliacao.comentario }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nenhuma Solicitação -->
      <div v-else class="bg-white rounded-xl shadow-md p-12 text-center">
        <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Nenhuma solicitação encontrada</h3>
        <p class="text-gray-600 mb-6">Você ainda não tem solicitações nesta categoria</p>
        <router-link
          to="/"
          class="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
        >
          Buscar Serviços
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filtroAtivo = ref('todas')

const filtros = [
  { label: 'Todas', value: 'todas', count: 12 },
  { label: 'Pendentes', value: 'pendente', count: 2 },
  { label: 'Aceitos', value: 'aceito', count: 1 },
  { label: 'Em Andamento', value: 'em-andamento', count: 2 },
  { label: 'Concluídos', value: 'concluido', count: 6 },
  { label: 'Cancelados', value: 'cancelado', count: 1 }
]

const solicitacoes = ref([
  {
    id: '10234',
    servico: 'Instalação Elétrica Residencial',
    prestador: 'João Silva',
    status: 'em-andamento',
    statusText: 'Em Andamento',
    valor: '450,00',
    data: '15/11/2025',
    dataAgendada: '20/11/2025',
    horario: '14:00',
    localizacao: 'Centro',
    descricao: 'Instalação de tomadas e interruptores em 3 cômodos, com troca de fiação antiga.',
    progresso: 65,
    avaliado: false
  },
  {
    id: '10198',
    servico: 'Limpeza Completa Residencial',
    prestador: 'Maria Santos',
    status: 'aceito',
    statusText: 'Aceito',
    valor: '280,00',
    data: '16/11/2025',
    dataAgendada: '22/11/2025',
    horario: '09:00',
    localizacao: 'Jardim América',
    descricao: 'Limpeza completa de apartamento com 2 quartos, incluindo lavagem de janelas.',
    avaliado: false
  },
  {
    id: '10156',
    servico: 'Reparo em Encanamento',
    prestador: 'Pedro Costa',
    status: 'concluido',
    statusText: 'Concluído',
    valor: '320,00',
    data: '10/11/2025',
    dataAgendada: '12/11/2025',
    horario: '10:00',
    localizacao: 'Centro',
    descricao: 'Conserto de vazamento no banheiro e troca de registros.',
    avaliado: true,
    avaliacao: {
      nota: 5,
      comentario: 'Excelente profissional! Muito pontual e resolveu o problema rapidamente.'
    }
  },
  {
    id: '10089',
    servico: 'Pintura de Sala e Quarto',
    prestador: 'Carlos Mendes',
    status: 'pendente',
    statusText: 'Aguardando Resposta',
    valor: '680,00',
    data: '17/11/2025',
    dataAgendada: '25/11/2025',
    horario: '08:00',
    localizacao: 'Vila Nova',
    descricao: 'Pintura completa de sala e quarto, incluindo preparação de parede.',
    avaliado: false
  },
  {
    id: '10012',
    servico: 'Manutenção de Jardim',
    prestador: 'Ana Paula',
    status: 'cancelado',
    statusText: 'Cancelado',
    valor: '150,00',
    data: '08/11/2025',
    dataAgendada: '10/11/2025',
    horario: '15:00',
    localizacao: 'Centro',
    descricao: 'Poda de árvores e manutenção geral do jardim.',
    avaliado: false
  }
])

const solicitacoesFiltradas = computed(() => {
  if (filtroAtivo.value === 'todas') {
    return solicitacoes.value
  }
  return solicitacoes.value.filter(s => s.status === filtroAtivo.value)
})
</script>
