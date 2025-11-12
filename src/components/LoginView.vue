<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Cabeçalho -->
      <div class="text-center">
        <router-link to="/" class="inline-block">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">iServ</h1>
        </router-link>
        <h2 class="text-2xl font-bold text-gray-900">Entrar na sua conta</h2>
        <p class="mt-2 text-sm text-gray-600">
          Ou
          <router-link to="/cadastro-cliente" class="font-medium text-gray-900 hover:underline ml-1">
            criar uma nova conta
          </router-link>
        </p>
      </div>

      <!-- Formulário -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.senha"
                :type="mostrarSenha ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="mostrarSenha = !mostrarSenha"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg v-if="!mostrarSenha" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.lembrar"
                type="checkbox"
                class="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span class="ml-2 text-sm text-gray-600">Lembrar-me</span>
            </label>

            <router-link to="/recuperar-senha" class="text-sm font-medium text-gray-900 hover:underline">
              Esqueceu a senha?
            </router-link>
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Mensagem de alerta para prestadores não verificados -->
          <div v-if="showVerificationWarning" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <div class="text-sm text-yellow-800">
                <p class="font-semibold mb-1">Conta em Verificação</p>
                <p>Seu cadastro como prestador está em análise. Você será notificado por email quando for aprovado.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Entrar</span>
            <span v-else>Entrando...</span>
          </button>
        </form>

        <!-- Divisor -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>

        <!-- Login Social -->
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="text-sm font-medium text-gray-700">Google</span>
          </button>

          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        <!-- Link de cadastro -->
        <div class="mt-6 pt-6 border-t border-gray-200 text-center">
          <p class="text-sm text-gray-600 mb-3">Ainda não tem uma conta?</p>
          <div class="flex flex-col sm:flex-row gap-3">
            <router-link
              to="/cadastro-cliente"
              class="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all text-center"
            >
              Cadastrar como Cliente
            </router-link>
            <router-link
              to="/cadastro-prestador"
              class="flex-1 py-2 px-4 border border-gray-900 bg-gray-50 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-100 transition-all text-center"
            >
              Cadastrar como Prestador
            </router-link>
          </div>
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
  senha: '',
  lembrar: false
})

const loading = ref(false)
const error = ref('')
const mostrarSenha = ref(false)
const showVerificationWarning = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  showVerificationWarning.value = false

  try {
    // Simular autenticação
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Aqui você faria a chamada real para sua API
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form.value)
    // })
    // const data = await response.json()

    // Simulação: buscar usuário do localStorage (temporário)
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === form.value.email && u.senha === form.value.senha)

    if (!user) {
      // Tentativa de login com credenciais fictícias para demonstração
      if (form.value.email === 'prestador@teste.com' && form.value.senha === '123456') {
        const mockUser = {
          id: 1,
          email: 'prestador@teste.com',
          nome: 'João Silva',
          role: 'prestador',
          verificado: true,
          statusVerificacao: 'aprovado',
          tipoPrestador: 'PF'
        }

        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('userRole', 'prestador')
        localStorage.setItem('isAuthenticated', 'true')

        router.push({ name: 'prestador-dashboard' })
        return
      }

      if (form.value.email === 'cliente@teste.com' && form.value.senha === '123456') {
        const mockUser = {
          id: 2,
          email: 'cliente@teste.com',
          nome: 'Maria Santos',
          role: 'cliente'
        }

        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('userRole', 'cliente')
        localStorage.setItem('isAuthenticated', 'true')

        router.push({ name: 'cliente-dashboard' })
        return
      }

      error.value = 'Email ou senha incorretos'
      return
    }

    // Verificar se é prestador
    if (user.role === 'prestador') {
      // Verificar status de verificação
      if (!user.verificado || user.statusVerificacao === 'pendente') {
        showVerificationWarning.value = true

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('userRole', 'prestador')
        localStorage.setItem('isAuthenticated', 'true')

        // Redirecionar para página de verificação pendente
        setTimeout(() => {
          router.push({ name: 'verificacao-pendente' })
        }, 2000)
        return
      }

      if (user.statusVerificacao === 'recusado') {
        error.value = 'Sua conta foi recusada. Entre em contato com o suporte.'
        return
      }

      // Prestador aprovado
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userRole', 'prestador')
      localStorage.setItem('isAuthenticated', 'true')

      router.push({ name: 'prestador-dashboard' })
    } else {
      // Cliente
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userRole', 'cliente')
      localStorage.setItem('isAuthenticated', 'true')

      router.push({ name: 'cliente-dashboard' })
    }
  } catch (err) {
    error.value = 'Erro ao fazer login. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
