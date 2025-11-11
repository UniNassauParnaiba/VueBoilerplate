<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Cabeçalho -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block mb-4">
          <h1 class="text-4xl font-bold text-gray-900">iServ</h1>
        </router-link>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Cadastro de Cliente</h2>
        <p class="text-gray-600">Preencha seus dados para começar a contratar serviços</p>
      </div>

      <!-- Formulário -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Progresso -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Etapa {{ step }} de 3</span>
              <span class="text-sm text-gray-500">{{ Math.round((step / 3) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gray-900 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(step / 3) * 100}%` }"
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
              <label class="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
              <input
                v-model="form.cpf"
                type="text"
                required
                maxlength="14"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="000.000.000-00"
                @input="formatCPF"
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

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
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
          </div>

          <!-- Etapa 2: Endereço -->
          <div v-show="step === 2" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Endereço</h3>

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
              <div class="col-span-2 md:col-span-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                <input
                  v-model="form.cidade"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Cidade"
                />
              </div>

              <div class="col-span-2 md:col-span-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                <select
                  v-model="form.estado"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Rua *</label>
              <input
                v-model="form.rua"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Nome da rua"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                <input
                  v-model="form.numero"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Nº"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                <input
                  v-model="form.complemento"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Apto, bloco..."
                />
              </div>
            </div>
          </div>

          <!-- Etapa 3: Credenciais -->
          <div v-show="step === 3" class="space-y-4">
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
                  <a href="#" class="text-gray-900 underline">Termos de Uso</a> e a
                  <a href="#" class="text-gray-900 underline">Política de Privacidade</a>
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
              v-if="step < 3"
              type="button"
              @click="nextStep"
              class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Próximo
            </button>

            <button
              v-if="step === 3"
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
  cpf: '',
  dataNascimento: '',
  telefone: '',
  // Etapa 2
  cep: '',
  cidade: '',
  estado: '',
  bairro: '',
  rua: '',
  numero: '',
  complemento: '',
  // Etapa 3
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
  if (step.value < 3) {
    step.value++
  }
}

const formatCPF = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    form.value.cpf = value
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
        form.value.rua = data.logradouro
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
    // Simulação de cadastro (substituir por chamada à API)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Criar objeto do usuário
    const user = {
      id: Date.now(),
      nome: form.value.nome,
      email: form.value.email,
      cpf: form.value.cpf,
      telefone: form.value.telefone,
      endereco: {
        cep: form.value.cep,
        cidade: form.value.cidade,
        estado: form.value.estado,
        bairro: form.value.bairro,
        rua: form.value.rua,
        numero: form.value.numero,
        complemento: form.value.complemento
      },
      role: 'cliente',
      dataCadastro: new Date().toISOString()
    }

    // Salvar no localStorage
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userRole', 'cliente')
    localStorage.setItem('isAuthenticated', 'true')

    // Redirecionar para dashboard
    router.push({ name: 'cliente-dashboard' })
  } catch (err) {
    error.value = 'Erro ao realizar cadastro. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
