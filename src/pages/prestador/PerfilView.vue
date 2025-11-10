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
              <h1 class="text-2xl font-bold text-gray-900">Meu Perfil Profissional</h1>
              <p class="text-gray-600 mt-1">Gerencie suas informações e serviços</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Mensagem de Sucesso -->
      <div v-if="showSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>Perfil atualizado com sucesso!</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <!-- Avatar e Status -->
            <div class="text-center mb-6">
              <div class="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3 relative">
                {{ form.nome.charAt(0) }}
                <span
                  v-if="form.verificado"
                  class="absolute bottom-0 right-0 w-7 h-7 bg-green-500 border-4 border-white rounded-full flex items-center justify-center"
                >
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <button class="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Alterar Foto
              </button>

              <div v-if="form.verificado" class="mt-3 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Verificado
              </div>
            </div>

            <!-- Menu de Seções -->
            <nav class="space-y-1">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="activeSection = section.id"
                :class="[
                  'w-full text-left px-3 py-2 rounded-lg font-medium transition-all text-sm',
                  activeSection === section.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                {{ section.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Conteúdo Principal -->
        <div class="lg:col-span-3">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Dados Pessoais -->
            <div v-show="activeSection === 'personal'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Dados Pessoais</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    v-model="form.nome"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CPF/CNPJ</label>
                  <input
                    v-model="form.documento"
                    type="text"
                    disabled
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefone/WhatsApp</label>
                  <input
                    v-model="form.telefone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <!-- Serviços Oferecidos -->
            <div v-show="activeSection === 'services'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Serviços Oferecidos</h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Categoria Principal</label>
                  <select
                    v-model="form.categoriaPrincipal"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    <option value="Construção Civil">Construção Civil</option>
                    <option value="Eletricista">Eletricista</option>
                    <option value="Encanador">Encanador</option>
                    <option value="Pintura">Pintura</option>
                    <option value="Limpeza">Limpeza</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Experiência Profissional</label>
                  <select
                    v-model="form.experiencia"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    <option value="Menos de 1 ano">Menos de 1 ano</option>
                    <option value="1-3 anos">1-3 anos</option>
                    <option value="3-5 anos">3-5 anos</option>
                    <option value="5-10 anos">5-10 anos</option>
                    <option value="Mais de 10 anos">Mais de 10 anos</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Descrição dos Serviços</label>
                  <textarea
                    v-model="form.descricao"
                    rows="5"
                    required
                    maxlength="500"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    placeholder="Descreva os serviços que você oferece, especialidades, diferenciais..."
                  ></textarea>
                  <p class="text-sm text-gray-500 mt-1">{{ form.descricao.length }}/500 caracteres</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Preço Médio por Hora</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      v-model="form.precoHora"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Área de Atendimento -->
            <div v-show="activeSection === 'location'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Área de Atendimento</h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CEP Base</label>
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
                    <input
                      v-model="form.endereco.estado"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
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
                  <label class="block text-sm font-medium text-gray-700 mb-2">Raio de Atendimento (km)</label>
                  <input
                    v-model="form.raioAtendimento"
                    type="number"
                    required
                    min="1"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <p class="text-sm text-gray-500 mt-1">Distância máxima que você atende</p>
                </div>
              </div>
            </div>

            <!-- Portfólio -->
            <div v-show="activeSection === 'portfolio'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Portfólio e Certificações</h2>

              <div class="space-y-6">
                <!-- Upload de Fotos -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Fotos dos Trabalhos</label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-gray-600 mb-1">Clique para adicionar fotos</p>
                    <p class="text-sm text-gray-500">PNG, JPG até 5MB</p>
                  </div>
                </div>

                <!-- Certificações -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Certificações e Cursos</label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-gray-600 mb-1">Adicione certificados</p>
                    <p class="text-sm text-gray-500">PDF até 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Configurações -->
            <div v-show="activeSection === 'settings'" class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Configurações da Conta</h2>

              <div class="space-y-6">
                <!-- Notificações -->
                <div>
                  <h3 class="font-semibold text-gray-900 mb-4">Notificações</h3>
                  <div class="space-y-3">
                    <label class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span class="text-gray-700">Novas solicitações de serviço</span>
                      <input
                        v-model="form.notificacoes.solicitacoes"
                        type="checkbox"
                        class="w-5 h-5 text-gray-900 rounded"
                      />
                    </label>

                    <label class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span class="text-gray-700">Mensagens de clientes</span>
                      <input
                        v-model="form.notificacoes.mensagens"
                        type="checkbox"
                        class="w-5 h-5 text-gray-900 rounded"
                      />
                    </label>
                  </div>
                </div>

                <!-- Disponibilidade -->
                <div>
                  <h3 class="font-semibold text-gray-900 mb-4">Disponibilidade</h3>
                  <label class="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <p class="font-medium text-gray-900">Aceitar novos serviços</p>
                      <p class="text-sm text-gray-600">Desative quando não estiver disponível</p>
                    </div>
                    <input
                      v-model="form.aceitandoServicos"
                      type="checkbox"
                      class="w-6 h-6 text-gray-900 rounded"
                    />
                  </label>
                </div>
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
                to="/prestador/dashboard"
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
  { id: 'personal', name: 'Dados Pessoais' },
  { id: 'services', name: 'Serviços' },
  { id: 'location', name: 'Área de Atendimento' },
  { id: 'portfolio', name: 'Portfólio' },
  { id: 'settings', name: 'Configurações' }
]

const form = ref({
  nome: '',
  documento: '',
  telefone: '',
  email: '',
  categoriaPrincipal: '',
  experiencia: '',
  descricao: '',
  precoHora: '',
  endereco: {
    cep: '',
    cidade: '',
    estado: '',
    bairro: '',
    raioAtendimento: ''
  },
  verificado: false,
  aceitandoServicos: true,
  notificacoes: {
    solicitacoes: true,
    mensagens: true
  }
})

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    const user = JSON.parse(userData)
    form.value = {
      nome: user.nome || '',
      documento: user.documento || '',
      telefone: user.telefone || '',
      email: user.email || '',
      categoriaPrincipal: user.categoria || '',
      experiencia: user.experiencia || '',
      descricao: user.descricao || '',
      precoHora: user.precoHora || '',
      endereco: user.endereco || {
        cep: '',
        cidade: '',
        estado: '',
        bairro: '',
        raioAtendimento: ''
      },
      verificado: user.verificado || false,
      aceitandoServicos: user.aceitandoServicos !== undefined ? user.aceitandoServicos : true,
      notificacoes: user.notificacoes || {
        solicitacoes: true,
        mensagens: true
      }
    }
  }
})

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  showSuccess.value = false

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    const updatedUser = {
      ...userData,
      ...form.value
    }
    localStorage.setItem('user', JSON.stringify(updatedUser))

    showSuccess.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })

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
