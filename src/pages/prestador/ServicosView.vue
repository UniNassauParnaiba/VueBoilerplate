<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <router-link
              to="/prestador/dashboard"
              class="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </router-link>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Meus Serviços</h1>
              <p class="text-gray-600 mt-1">Gerencie suas solicitações e atendimentos</p>
            </div>
          </div>

          <!-- Estatísticas Rápidas -->
          <div class="hidden md:flex gap-6">
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900">{{ stats.pendentes }}</p>
              <p class="text-sm text-gray-600">Pendentes</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-blue-600">{{ stats.andamento }}</p>
              <p class="text-sm text-gray-600">Em Andamento</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-green-600">{{ stats.concluidos }}</p>
              <p class="text-sm text-gray-600">Concluídos</p>
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

      <!-- Lista de Serviços -->
      <div v-if="servicosFiltrados.length > 0" class="space-y-4">
        <div
          v-for="servico in servicosFiltrados"
          :key="servico.id"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
        >
          <div class="p-6">
            <!-- Header do Card -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold text-gray-900">{{ servico.titulo }}</h3>
                  <span
                    :class="{
                      'bg-orange-100 text-orange-800': servico.status === 'novo',
                      'bg-yellow-100 text-yellow-800': servico.status === 'pendente',
                      'bg-blue-100 text-blue-800': servico.status === 'aceito',
                      'bg-purple-100 text-purple-800': servico.status === 'em-andamento',
                      'bg-green-100 text-green-800': servico.status === 'concluido',
                      'bg-red-100 text-red-800': servico.status === 'recusado'
                    }"
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ servico.statusText }}
                  </span>
                </div>
                <p class="text-gray-600">Cliente: <span class="font-medium">{{ servico.cliente }}</span></p>
                <p class="text-sm text-gray-500 mt-1">Solicitado em {{ servico.dataSolicitacao }}</p>
              </div>

              <div class="text-right">
                <p class="text-2xl font-bold text-gray-900">R$ {{ servico.valor }}</p>
                <p class="text-sm text-gray-500">ID: #{{ servico.id }}</p>
              </div>
            </div>

            <!-- Descrição -->
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <p class="text-sm font-medium text-gray-900 mb-2">Descrição do Serviço:</p>
              <p class="text-gray-700">{{ servico.descricao }}</p>
            </div>

            <!-- Informações do Agendamento -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p class="text-xs text-gray-500 mb-1">Data Solicitada</p>
                <p class="text-sm font-medium text-gray-900">{{ servico.dataAgendada }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Horário</p>
                <p class="text-sm font-medium text-gray-900">{{ servico.horario }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Localização</p>
                <p class="text-sm font-medium text-gray-900">{{ servico.localizacao }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Contato</p>
                <p class="text-sm font-medium text-gray-900">{{ servico.telefone }}</p>
              </div>
            </div>

            <!-- Barra de Progresso (apenas para em andamento) -->
            <div v-if="servico.status === 'em-andamento'" class="mb-4">
              <div class="flex items-center justify-between text-sm mb-2">
                <span class="text-gray-600">Progresso do Serviço</span>
                <span class="font-semibold text-gray-900">{{ servico.progresso }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${servico.progresso}%` }"
                ></div>
              </div>
              <div class="mt-2">
                <input
                  type="range"
                  v-model="servico.progresso"
                  min="0"
                  max="100"
                  class="w-full"
                >
              </div>
            </div>

            <!-- Ações por Status -->
            <div class="flex flex-wrap gap-3">
              <!-- Novo -->
              <template v-if="servico.status === 'novo'">
                <button
                  @click="aceitarServico(servico.id)"
                  class="flex-1 min-w-[150px] bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Aceitar Solicitação
                </button>
                <button
                  @click="recusarServico(servico.id)"
                  class="flex-1 min-w-[150px] bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Recusar
                </button>
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Ver Detalhes
                </button>
              </template>

              <!-- Aceito -->
              <template v-if="servico.status === 'aceito'">
                <button
                  @click="iniciarServico(servico.id)"
                  class="flex-1 min-w-[150px] bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  Iniciar Serviço
                </button>
                <button class="flex-1 min-w-[150px] bg-gray-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all">
                  Contatar Cliente
                </button>
              </template>

              <!-- Em Andamento -->
              <template v-if="servico.status === 'em-andamento'">
                <button
                  @click="finalizarServico(servico.id)"
                  class="flex-1 min-w-[150px] bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  Finalizar Serviço
                </button>
                <button class="flex-1 min-w-[150px] bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-all">
                  Atualizar Progresso
                </button>
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Mensagens
                </button>
              </template>

              <!-- Concluído -->
              <template v-if="servico.status === 'concluido'">
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Ver Recibo
                </button>
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Contato Cliente
                </button>
              </template>

              <!-- Recusado -->
              <template v-if="servico.status === 'recusado'">
                <button class="flex-1 min-w-[150px] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Ver Motivo
                </button>
              </template>
            </div>
          </div>

          <!-- Avaliação do Cliente (se houver) -->
          <div v-if="servico.avaliacaoCliente" class="bg-green-50 px-6 py-4 border-t border-green-200">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <p class="text-sm font-semibold text-green-900 mb-1">Avaliação do Cliente</p>
                <div class="flex items-center gap-1 mb-2">
                  <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= servico.avaliacaoCliente.nota ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="ml-2 text-sm font-semibold text-green-900">{{ servico.avaliacaoCliente.nota }}/5</span>
                </div>
                <p class="text-sm text-green-800">"{{ servico.avaliacaoCliente.comentario }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nenhum Serviço -->
      <div v-else class="bg-white rounded-xl shadow-md p-12 text-center">
        <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Nenhum serviço encontrado</h3>
        <p class="text-gray-600 mb-6">Você ainda não tem serviços nesta categoria</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filtroAtivo = ref('todos')

const filtros = [
  { label: 'Todos', value: 'todos', count: 15 },
  { label: 'Novos', value: 'novo', count: 3 },
  { label: 'Aceitos', value: 'aceito', count: 2 },
  { label: 'Em Andamento', value: 'em-andamento', count: 4 },
  { label: 'Concluídos', value: 'concluido', count: 5 },
  { label: 'Recusados', value: 'recusado', count: 1 }
]

const stats = ref({
  pendentes: 3,
  andamento: 4,
  concluidos: 5
})

const servicos = ref([
  {
    id: '20451',
    titulo: 'Instalação de Ventiladores de Teto',
    cliente: 'Ana Paula Silva',
    status: 'novo',
    statusText: 'Nova Solicitação',
    valor: '180,00',
    dataSolicitacao: '18/11/2025 às 14:30',
    dataAgendada: '20/11/2025',
    horario: '14:00',
    localizacao: 'Centro, 3.2km',
    telefone: '(11) 98765-4321',
    descricao: 'Preciso instalar 2 ventiladores de teto, um na sala e outro no quarto. Os ventiladores já foram comprados.',
    progresso: 0
  },
  {
    id: '20398',
    titulo: 'Instalação Elétrica Completa',
    cliente: 'Roberto Costa',
    status: 'em-andamento',
    statusText: 'Em Andamento',
    valor: '850,00',
    dataSolicitacao: '15/11/2025 às 09:15',
    dataAgendada: '17/11/2025',
    horario: '08:00',
    localizacao: 'Jardim América, 5.8km',
    telefone: '(11) 97654-3210',
    descricao: 'Instalação elétrica completa em apartamento novo. Necessário instalar quadro de distribuição, tomadas e pontos de luz.',
    progresso: 65
  },
  {
    id: '20312',
    titulo: 'Manutenção Preventiva Elétrica',
    cliente: 'Maria Santos',
    status: 'aceito',
    statusText: 'Aceito - Aguardando Início',
    valor: '320,00',
    dataSolicitacao: '16/11/2025 às 16:45',
    dataAgendada: '22/11/2025',
    horario: '09:00',
    localizacao: 'Vila Nova, 7.5km',
    telefone: '(11) 96543-2109',
    descricao: 'Fazer revisão geral da instalação elétrica, verificar quadro de distribuição e trocar disjuntores se necessário.',
    progresso: 0
  },
  {
    id: '20156',
    titulo: 'Instalação de Chuveiro Elétrico',
    cliente: 'Carlos Mendes',
    status: 'concluido',
    statusText: 'Concluído',
    valor: '150,00',
    dataSolicitacao: '10/11/2025 às 10:20',
    dataAgendada: '12/11/2025',
    horario: '15:00',
    localizacao: 'Centro, 2.1km',
    telefone: '(11) 95432-1098',
    descricao: 'Instalação de chuveiro elétrico no banheiro, incluindo fiação adequada.',
    progresso: 100,
    avaliacaoCliente: {
      nota: 5,
      comentario: 'Excelente trabalho! Muito profissional e pontual. Recomendo!'
    }
  },
  {
    id: '20089',
    titulo: 'Troca de Tomadas Antigas',
    cliente: 'Juliana Lima',
    status: 'recusado',
    statusText: 'Recusado',
    valor: '120,00',
    dataSolicitacao: '14/11/2025 às 11:30',
    dataAgendada: '15/11/2025',
    horario: '13:00',
    localizacao: 'Zona Sul, 18.2km',
    telefone: '(11) 94321-0987',
    descricao: 'Trocar 8 tomadas antigas por novas com padrão atual.',
    progresso: 0
  }
])

const servicosFiltrados = computed(() => {
  if (filtroAtivo.value === 'todos') {
    return servicos.value
  }
  return servicos.value.filter(s => s.status === filtroAtivo.value)
})

const aceitarServico = (id) => {
  const servico = servicos.value.find(s => s.id === id)
  if (servico) {
    servico.status = 'aceito'
    servico.statusText = 'Aceito - Aguardando Início'
  }
}

const recusarServico = (id) => {
  const servico = servicos.value.find(s => s.id === id)
  if (servico) {
    servico.status = 'recusado'
    servico.statusText = 'Recusado'
  }
}

const iniciarServico = (id) => {
  const servico = servicos.value.find(s => s.id === id)
  if (servico) {
    servico.status = 'em-andamento'
    servico.statusText = 'Em Andamento'
    servico.progresso = 10
  }
}

const finalizarServico = (id) => {
  const servico = servicos.value.find(s => s.id === id)
  if (servico) {
    servico.status = 'concluido'
    servico.statusText = 'Concluído'
    servico.progresso = 100
  }
}
</script>
