<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Cabeçalho -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block mb-4">
          <h1 class="text-4xl font-bold text-gray-900">iServ</h1>
        </router-link>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Cadastro de Prestador</h2>
        <p class="text-gray-600">Crie seu perfil profissional e comece a receber solicitações</p>
      </div>

      <!-- Formulário -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Progresso -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Etapa {{ step }} de 4</span>
              <span class="text-sm text-gray-500">{{ Math.round((step / 4) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gray-900 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(step / 4) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Etapa 1: Dados Pessoais -->
          <div v-show="step === 1" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Dados Pessoais</h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
              <input
                v-model="form.nome"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CPF/CNPJ *</label>
              <input
                v-model="form.documento"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telefone/WhatsApp *</label>
              <input
                v-model="form.telefone"
                type="tel"
                required
                maxlength="15"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="(00) 00000-0000"
                @input="formatPhone"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
              <input
                v-model="form.dataNascimento"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Etapa 2: Serviços -->
          <div v-show="step === 2" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Serviços Oferecidos</h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Categoria Principal *</label>
              <select
                v-model="form.categoriaPrincipal"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Construção Civil">Construção Civil</option>
                <option value="Reparos e Manutenção">Reparos e Manutenção</option>
                <option value="Eletricista">Eletricista</option>
                <option value="Encanador">Encanador</option>
                <option value="Pintura">Pintura</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Jardinagem">Jardinagem</option>
                <option value="Culinária">Culinária</option>
                <option value="Beleza e Estética">Beleza e Estética</option>
                <option value="Educação">Educação</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tempo de Experiência *</label>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Descrição dos Serviços *</label>
              <textarea
                v-model="form.descricao"
                required
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Descreva os serviços que você oferece, suas especialidades e diferenciais..."
              ></textarea>
              <p class="text-sm text-gray-500 mt-1">{{ form.descricao.length }}/500 caracteres</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preço Médio por Hora *</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                <input
                  v-model="form.precoHora"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          <!-- Etapa 3: Endereço -->
          <div v-show="step === 3" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Área de Atendimento</h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
              <input
                v-model="form.cep"
                type="text"
                required
                maxlength="9"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="00000-000"
                @input="formatCEP"
                @blur="buscarCEP"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                <input
                  v-model="form.cidade"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Cidade"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                <select
                  v-model="form.estado"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">UF</option>
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                  <option value="CE">CE</option>
                  <!-- Adicionar outros estados -->
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
              <input
                v-model="form.bairro"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Bairro"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Raio de Atendimento (km) *</label>
              <input
                v-model="form.raioAtendimento"
                type="number"
                required
                min="1"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Ex: 10"
              />
              <p class="text-sm text-gray-500 mt-1">Distância máxima que você atende a partir do seu endereço</p>
            </div>
          </div>

          <!-- Etapa 4: Credenciais -->
          <div v-show="step === 4" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Dados de Acesso</h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Senha *</label>
              <input
                v-model="form.senha"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha *</label>
              <input
                v-model="form.confirmarSenha"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Digite a senha novamente"
              />
              <p v-if="form.senha && form.confirmarSenha && form.senha !== form.confirmarSenha" class="text-red-600 text-sm mt-1">
                As senhas não coincidem
              </p>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-semibold mb-1">Verificação de Perfil</p>
                  <p>Após o cadastro, sua conta passará por uma verificação. Isso garante mais segurança para você e seus clientes.</p>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <label class="flex items-start gap-2">
                <input
                  v-model="form.aceitarTermos"
                  type="checkbox"
                  required
                  class="w-4 h-4 mt-1 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <span class="text-sm text-gray-600">
                  Eu li e aceito os
                  <a href="#" class="text-gray-900 underline">Termos de Uso</a>,
                  <a href="#" class="text-gray-900 underline">Política de Privacidade</a> e
                  <a href="#" class="text-gray-900 underline">Termos para Prestadores</a>
                </span>
              </label>
            </div>
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Botões de navegação -->
          <div class="flex gap-4 pt-4">
            <button
              v-if="step > 1"
              type="button"
              @click="step--"
              class="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Voltar
            </button>

            <button
              v-if="step < 4"
              type="button"
              @click="nextStep"
              class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Próximo
            </button>

            <button
              v-if="step === 4"
              type="submit"
              :disabled="loading || !isFormValid"
              class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">Finalizar Cadastro</span>
              <span v-else>Cadastrando...</span>
            </button>
          </div>
        </form>

        <!-- Link para Login -->
        <div class="text-center mt-6 pt-6 border-t border-gray-200">
          <p class="text-gray-600">
            Já tem uma conta?
            <router-link to="/login" class="text-gray-900 font-semibold hover:underline ml-1">
              Fazer Login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const step = ref(1)
const loading = ref(false)
const error = ref('')

const form = ref({
  // Etapa 1
  nome: '',
  documento: '',
  telefone: '',
  dataNascimento: '',
  // Etapa 2
  categoriaPrincipal: '',
  experiencia: '',
  descricao: '',
  precoHora: '',
  // Etapa 3
  cep: '',
  cidade: '',
  estado: '',
  bairro: '',
  raioAtendimento: '',
  // Etapa 4
  email: '',
  senha: '',
  confirmarSenha: '',
  aceitarTermos: false
})

const isFormValid = computed(() => {
  return form.value.senha === form.value.confirmarSenha &&
    form.value.aceitarTermos &&
    form.value.senha.length >= 6
})

const nextStep = () => {
  if (step.value < 4) {
    step.value++
  }
}

const formatPhone = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    form.value.telefone = value
  }
}

const formatCEP = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length <= 8) {
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    form.value.cep = value
  }
}

const buscarCEP = async () => {
  const cep = form.value.cep.replace(/\D/g, '')
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (!data.erro) {
        form.value.cidade = data.localidade
        form.value.estado = data.uf
        form.value.bairro = data.bairro
      }
    } catch (err) {
      console.error('Erro ao buscar CEP:', err)
    }
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = 'Por favor, preencha todos os campos corretamente'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    const user = {
      id: Date.now(),
      nome: form.value.nome,
      email: form.value.email,
      documento: form.value.documento,
      telefone: form.value.telefone,
      categoria: form.value.categoriaPrincipal,
      experiencia: form.value.experiencia,
      descricao: form.value.descricao,
      precoHora: form.value.precoHora,
      endereco: {
        cep: form.value.cep,
        cidade: form.value.cidade,
        estado: form.value.estado,
        bairro: form.value.bairro,
        raioAtendimento: form.value.raioAtendimento
      },
      role: 'prestador',
      verificado: false,
      rating: 0,
      totalAvaliacoes: 0,
      dataCadastro: new Date().toISOString()
    }

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userRole', 'prestador')
    localStorage.setItem('isAuthenticated', 'true')

    router.push({ name: 'prestador-dashboard' })
  } catch (err) {
    error.value = 'Erro ao realizar cadastro. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
