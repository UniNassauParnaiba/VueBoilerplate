<template>
  <div class="min-h-screen bg-white py-8 px-4 transition-colors duration-200">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
        <p class="text-gray-600">Gerencie suas informações pessoais e configurações da conta</p>
      </div>

      <!-- Card de Perfil -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6">

        <!-- Header do Card (mantido estilo azul da home) -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div class="flex items-center gap-6">

            <!-- Avatar -->
            <div class="w-24 h-24 rounded-full bg-white flex items-center justify-center text-gray-900 text-3xl font-bold">
              {{ userInitials }}
            </div>

            <!-- Informações Básicas -->
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-white mb-1">{{ userName }}</h2>
              <p class="text-gray-200 mb-2">{{ user?.email }}</p>

              <div class="flex gap-2">
                <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                  {{ userRole === 'cliente' ? 'Cliente' : 'Prestador de Serviço' }}
                </span>

                <span v-if="userRole === 'prestador' && user?.verificado"
                      class="px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-white text-sm font-semibold flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd" />
                  </svg>
                  Verificado
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Conteúdo do Card -->
        <div class="p-6">

          <!-- Tabs -->
          <div class="border-b border-gray-200 mb-6">
            <nav class="flex gap-6">
              <button
                @click="activeTab = 'informacoes'"
                :class="[
                  'pb-4 border-b-2 font-semibold transition-colors',
                  activeTab === 'informacoes'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]">
                Informações Pessoais
              </button>

              <button
                @click="activeTab = 'seguranca'"
                :class="[
                  'pb-4 border-b-2 font-semibold transition-colors',
                  activeTab === 'seguranca'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]">
                Segurança
              </button>

              <button
                @click="activeTab = 'configuracoes'"
                :class="[
                  'pb-4 border-b-2 font-semibold transition-colors',
                  activeTab === 'configuracoes'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]">
                Configurações
              </button>
            </nav>
          </div>

          <!-- Tab: Informações Pessoais -->
          <div v-if="activeTab === 'informacoes'" class="space-y-6">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ userRole === 'prestador' && user?.tipoPrestador === 'PJ' ? 'Razão Social' : 'Nome Completo' }}
                </label>
                <input type="text" :value="userName" disabled
                       class="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" :value="user?.email" disabled
                       class="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ user?.cnpj ? 'CNPJ' : 'CPF' }}
                </label>
                <input type="text" :value="user?.cpf || user?.cnpj" disabled
                       class="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input type="tel" :value="user?.telefone" disabled
                       class="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg" />
              </div>

              <div v-if="userRole === 'prestador'" class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <input type="text" :value="user?.categoriaPrincipal || user?.categoria" disabled
                       class="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg" />
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-sm text-blue-800">
                <strong>Nota:</strong> Para alterar suas informações pessoais, entre em contato com o suporte.
              </p>
            </div>
          </div>

          <!-- Tab: Segurança -->
          <div v-if="activeTab === 'seguranca'" class="space-y-6">

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h3>

              <div class="space-y-4">

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
                  <input type="password"
                         class="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
                         placeholder="Digite sua senha atual" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
                  <input type="password"
                         class="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
                         placeholder="Digite sua nova senha" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
                  <input type="password"
                         class="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
                         placeholder="Confirme sua nova senha" />
                </div>

                <button
                  class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Alterar Senha
                </button>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Informações da Conta</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <p><strong>Membro desde:</strong> {{ formatDate(user?.dataCadastro) }}</p>
                <p><strong>Último acesso:</strong> Hoje</p>
                <p><strong>ID da Conta:</strong> {{ user?.id }}</p>
              </div>
            </div>
          </div>

          <!-- Tab: Configurações -->
          <div v-if="activeTab === 'configuracoes'" class="space-y-6">

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Preferências</h3>

              <div class="space-y-4">

                <label
                  class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div>
                    <p class="font-medium text-gray-900">Notificações por Email</p>
                    <p class="text-sm text-gray-600">Receber atualizações e novidades</p>
                  </div>
                  <input type="checkbox" class="w-5 h-5 text-black rounded focus:ring-2 focus:ring-black" checked />
                </label>

                <label
                  class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div>
                    <p class="font-medium text-gray-900">Modo Escuro Automático</p>
                    <p class="text-sm text-gray-600">Seguir configuração do sistema</p>
                  </div>
                  <input type="checkbox" class="w-5 h-5 text-black rounded focus:ring-2 focus:ring-black" />
                </label>

                <label v-if="userRole === 'prestador'"
                       class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div>
                    <p class="font-medium text-gray-900">Aceitar Novas Solicitações</p>
                    <p class="text-sm text-gray-600">Receber pedidos de serviço</p>
                  </div>
                  <input type="checkbox" class="w-5 h-5 text-black rounded focus:ring-2 focus:ring-black" checked />
                </label>

              </div>
            </div>

            <!-- Zona de Perigo -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-semibold text-red-600 mb-4">Zona de Perigo</h3>

              <div class="bg-red-50 border-2 border-red-200 rounded-lg p-6">

                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>

                  <div class="flex-1">
                    <h4 class="font-semibold text-red-900 mb-2">Excluir Conta Permanentemente</h4>
                    <p class="text-sm text-red-700 mb-4">
                      Ao excluir sua conta, todos os seus dados serão removidos permanentemente.
                      Esta ação não pode ser desfeita.
                    </p>

                    <button @click="showDeleteModal = true"
                            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                      Excluir Minha Conta
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Botão Voltar -->
      <div class="flex justify-between">
        <button @click="$router.back()"
                class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
          Voltar
        </button>
      </div>

    </div>

    <!-- Modal de Exclusão -->
    <div v-if="showDeleteModal"
         class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showDeleteModal = false">

      <div class="bg-white rounded-lg p-8 max-w-md w-full border border-gray-200">

        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-gray-900 mb-2">Confirmar Exclusão</h3>
          <p class="text-gray-600 mb-6">
            Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos.
          </p>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p class="text-sm text-yellow-800 font-semibold mb-2">O que será perdido:</p>
            <ul class="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>Todas as suas informações pessoais</li>
              <li v-if="userRole === 'prestador'">Seu histórico de serviços e avaliações</li>
              <li v-if="userRole === 'cliente'">Suas solicitações e histórico</li>
              <li>Acesso à plataforma</li>
            </ul>
          </div>

          <div class="flex gap-4">
            <button @click="showDeleteModal = false"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
              Cancelar
            </button>

            <button @click="confirmDelete"
                    class="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all">
              Sim, Excluir
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, getCurrentUserRole, deleteCurrentUserAccount } from '@/services/userService'

const router = useRouter()

const user = ref(null)
const userRole = ref('')
const activeTab = ref('informacoes')
const showDeleteModal = ref(false)

onMounted(() => {
  user.value = getCurrentUser()
  userRole.value = getCurrentUserRole()

  if (!user.value) {
    router.push('/login')
  }
})

const userName = computed(() => {
  return user.value?.nome || user.value?.razaoSocial || 'Usuário'
})

const userInitials = computed(() => {
  const name = userName.value
  const parts = name.split(' ')
  if (parts.length > 1) {
    return parts[0][0] + parts[parts.length - 1][0]
  }
  return parts[0][0]
})

function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function confirmDelete() {
  try {
    deleteCurrentUserAccount()
    alert('Sua conta foi excluída com sucesso.')
    router.push('/')
  } catch (error) {
    alert('Erro ao excluir conta: ' + error.message)
  }
}
</script>
