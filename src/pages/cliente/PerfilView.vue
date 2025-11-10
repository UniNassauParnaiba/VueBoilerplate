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
              <h1 class="text-2xl font-bold text-gray-900">Meu Perfil</h1>
              <p class="text-gray-600 mt-1">Gerencie suas informações pessoais</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Mensagem de Sucesso -->
      <div v-if="showSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>Perfil atualizado com sucesso!</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <!-- Avatar -->
            <div class="text-center mb-6">
              <div class="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3">
                {{ form.nome.charAt(0) }}
              </div>
              <button class="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Alterar Foto
              </button>
            </div>

            <!-- Menu de Seções -->
            <nav class="space-y-1">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="activeSection = section.id"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3',
                  activeSection === section.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                <component :is="section.icon" class="w-5 h-5" />
                {{ section.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Conteúdo Principal -->
        <div class="lg:col-span-2">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Dados Pessoais -->
            <div v-show="activeSection === 'personal'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Dados Pessoais</h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    v-model="form.nome"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                  <input
                    v-model="form.cpf"
                    type="text"
                    disabled
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                  <p class="text-xs text-gray-500 mt-1">O CPF não pode ser alterado</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                  <input
                    v-model="form.dataNascimento"
                    type="date"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    v-model="form.telefone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <!-- Endereço -->
            <div v-show="activeSection === 'address'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Endereço</h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                  <input
                    v-model="form.endereco.cep"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                    <input
                      v-model="form.endereco.cidade"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                    <select
                      v-model="form.endereco.estado"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="">UF</option>
                      <option value="SP">SP</option>
                      <option value="RJ">RJ</option>
                      <option value="MG">MG</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                  <input
                    v-model="form.endereco.bairro"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Rua</label>
                  <input
                    v-model="form.endereco.rua"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Número</label>
                    <input
                      v-model="form.endereco.numero"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                    <input
                      v-model="form.endereco.complemento"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Segurança -->
            <div v-show="activeSection === 'security'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Segurança</h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div class="border-t border-gray-200 pt-6 mt-6">
                  <h3 class="font-semibold text-gray-900 mb-4">Alterar Senha</h3>

                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
                      <input
                        v-model="passwordForm.current"
                        type="password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
                      <input
                        v-model="passwordForm.new"
                        type="password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
                      <input
                        v-model="passwordForm.confirm"
                        type="password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notificações -->
            <div v-show="activeSection === 'notifications'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Preferências de Notificação</h2>

              <div class="space-y-4">
                <label class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p class="font-medium text-gray-900">Notificações por Email</p>
                    <p class="text-sm text-gray-600">Receba atualizações sobre seus serviços</p>
                  </div>
                  <input
                    v-model="form.notificacoes.email"
                    type="checkbox"
                    class="w-5 h-5 text-gray-900 rounded focus:ring-gray-900"
                  />
                </label>

                <label class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p class="font-medium text-gray-900">Notificações por SMS</p>
                    <p class="text-sm text-gray-600">Alertas importantes no seu celular</p>
                  </div>
                  <input
                    v-model="form.notificacoes.sms"
                    type="checkbox"
                    class="w-5 h-5 text-gray-900 rounded focus:ring-gray-900"
                  />
                </label>

                <label class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p class="font-medium text-gray-900">Novidades e Promoções</p>
                    <p class="text-sm text-gray-600">Receba ofertas exclusivas</p>
                  </div>
                  <input
                    v-model="form.notificacoes.promocoes"
                    type="checkbox"
                    class="w-5 h-5 text-gray-900 rounded focus:ring-gray-900"
                  />
                </label>
              </div>
            </div>

            <!-- Mensagem de erro -->
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ error }}
            </div>

            <!-- Botões de Ação -->
            <div class="flex gap-4 pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:bg-gray-400"
              >
                <span v-if="!loading">Salvar Alterações</span>
                <span v-else>Salvando...</span>
              </button>

              <router-link
                to="/cliente/dashboard"
                class="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all text-center"
              >
                Cancelar
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeSection = ref('personal')
const loading = ref(false)
const error = ref('')
const showSuccess = ref(false)

const sections = [
  {
    id: 'personal',
    name: 'Dados Pessoais',
    icon: 'svg'
  },
  {
    id: 'address',
    name: 'Endereço',
    icon: 'svg'
  },
  {
    id: 'security',
    name: 'Segurança',
    icon: 'svg'
  },
  {
    id: 'notifications',
    name: 'Notificações',
    icon: 'svg'
  }
]

const form = ref({
  nome: '',
  cpf: '',
  dataNascimento: '',
  telefone: '',
  email: '',
  endereco: {
    cep: '',
    cidade: '',
    estado: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: ''
  },
  notificacoes: {
    email: true,
    sms: false,
    promocoes: true
  }
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    const user = JSON.parse(userData)
    form.value = {
      nome: user.nome || '',
      cpf: user.cpf || '',
      dataNascimento: user.dataNascimento || '',
      telefone: user.telefone || '',
      email: user.email || '',
      endereco: user.endereco || {
        cep: '',
        cidade: '',
        estado: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: ''
      },
      notificacoes: user.notificacoes || {
        email: true,
        sms: false,
        promocoes: true
      }
    }
  }
})

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  showSuccess.value = false

  try {
    // Validar senha se estiver alterando
    if (passwordForm.value.new && passwordForm.value.new !== passwordForm.value.confirm) {
      error.value = 'As senhas não coincidem'
      loading.value = false
      return
    }

    // Simulação de atualização
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Atualizar localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    const updatedUser = {
      ...userData,
      ...form.value
    }
    localStorage.setItem('user', JSON.stringify(updatedUser))

    showSuccess.value = true

    // Limpar campos de senha
    passwordForm.value = {
      current: '',
      new: '',
      confirm: ''
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Esconder mensagem de sucesso após 3 segundos
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)

  } catch (err) {
    error.value = 'Erro ao atualizar perfil. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
