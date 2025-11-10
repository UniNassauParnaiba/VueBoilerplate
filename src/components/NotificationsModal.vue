<template>
  <!-- Overlay -->
  <div
    v-if="isOpen"
    @click="close"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
  >
    <!-- Modal -->
    <div
      @click.stop
      class="fixed top-20 right-4 w-96 max-h-[600px] bg-white rounded-xl shadow-2xl overflow-hidden animate-slide-in"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 class="text-lg font-bold text-white">Notificações</h3>
          </div>
          <button
            @click="close"
            class="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Lista de Notificações -->
      <div class="max-h-[500px] overflow-y-auto">
        <!-- Sem notificações -->
        <div v-if="notificacoes.length === 0" class="p-8 text-center">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p class="text-gray-500 font-medium">Nenhuma notificação</p>
          <p class="text-sm text-gray-400 mt-1">Você está em dia!</p>
        </div>

        <!-- Com notificações -->
        <div v-else>
          <div
            v-for="notificacao in notificacoes"
            :key="notificacao.id"
            :class="[
              'p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors',
              !notificacao.lida ? 'bg-blue-50' : ''
            ]"
            @click="marcarComoLida(notificacao.id)"
          >
            <div class="flex gap-3">
              <!-- Ícone -->
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  notificacao.tipo === 'sucesso' ? 'bg-green-100' :
                  notificacao.tipo === 'aviso' ? 'bg-yellow-100' :
                  notificacao.tipo === 'erro' ? 'bg-red-100' : 'bg-blue-100'
                ]"
              >
                <svg
                  :class="[
                    'w-5 h-5',
                    notificacao.tipo === 'sucesso' ? 'text-green-600' :
                    notificacao.tipo === 'aviso' ? 'text-yellow-600' :
                    notificacao.tipo === 'erro' ? 'text-red-600' : 'text-blue-600'
                  ]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path v-if="notificacao.tipo === 'sucesso'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  <path v-else-if="notificacao.tipo === 'aviso'" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  <path v-else fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>

              <!-- Conteúdo -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2 mb-1">
                  <p class="font-semibold text-gray-900 text-sm">{{ notificacao.titulo }}</p>
                  <span v-if="!notificacao.lida" class="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></span>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ notificacao.mensagem }}</p>
                <p class="text-xs text-gray-400">{{ notificacao.tempo }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="notificacoes.length > 0" class="border-t border-gray-200 p-4">
        <button
          @click="marcarTodasComoLidas"
          class="w-full py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          Marcar todas como lidas
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

// Notificações mockadas (você pode substituir por dados reais da API)
const notificacoes = ref([
  {
    id: 1,
    tipo: 'sucesso',
    titulo: 'Serviço Concluído',
    mensagem: 'O serviço de instalação elétrica foi marcado como concluído.',
    tempo: 'Há 5 minutos',
    lida: false
  },
  {
    id: 2,
    tipo: 'info',
    titulo: 'Nova Solicitação',
    mensagem: 'Você recebeu uma nova solicitação de serviço.',
    tempo: 'Há 1 hora',
    lida: false
  },
  {
    id: 3,
    tipo: 'aviso',
    titulo: 'Avaliação Pendente',
    mensagem: 'Você tem um serviço aguardando avaliação.',
    tempo: 'Há 3 horas',
    lida: true
  },
  {
    id: 4,
    tipo: 'sucesso',
    titulo: 'Pagamento Confirmado',
    mensagem: 'O pagamento do serviço foi confirmado.',
    tempo: 'Ontem',
    lida: true
  }
])

const close = () => {
  emit('close')
}

const marcarComoLida = (id) => {
  const notificacao = notificacoes.value.find(n => n.id === id)
  if (notificacao) {
    notificacao.lida = true
  }
}

const marcarTodasComoLidas = () => {
  notificacoes.value.forEach(n => n.lida = true)
}
</script>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
