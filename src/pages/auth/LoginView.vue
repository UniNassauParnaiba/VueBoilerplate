<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo e Título -->
      <div class="text-center">
        <router-link to="/" class="inline-block">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">iServ</h1>
        </router-link>
        <h2 class="text-2xl font-semibold text-gray-900">Bem-vindo de volta!</h2>
        <p class="text-gray-600 mt-2">Faça login para continuar</p>
      </div>

      <!-- Formulário -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <!-- Senha -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <!-- Lembrar-me e Esqueci senha -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.remember"
                type="checkbox"
                class="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span class="ml-2 text-sm text-gray-600">Lembrar-me</span>
            </label>
            <router-link to="/recuperar-senha" class="text-sm text-gray-900 hover:underline">
              Esqueceu a senha?
            </router-link>
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Botão de Login -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Entrar</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Entrando...
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Não tem uma conta?</span>
          </div>
        </div>

        <!-- Botões de Cadastro -->
        <div class="space-y-3">
          <router-link
            to="/escolher-cadastro"
            class="w-full block text-center bg-white border-2 border-gray-900 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
          >
            Criar uma conta
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simulação de login (substituir por chamada real à API)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Validação básica (remover em produção)
    if (form.value.email && form.value.password) {
      // Simular usuário logado
      const user = {
        id: 1,
        name: 'Usuário Teste',
        email: form.value.email,
        role: form.value.email.includes('prestador') ? 'prestador' : 'cliente'
      }

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('isAuthenticated', 'true')

      // Redirecionar baseado no tipo de usuário
      if (user.role === 'prestador') {
        router.push({ name: 'prestador-dashboard' })
      } else {
        router.push({ name: 'cliente-dashboard' })
      }
    } else {
      error.value = 'Email ou senha inválidos'
    }
  } catch (err) {
    error.value = 'Erro ao fazer login. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
