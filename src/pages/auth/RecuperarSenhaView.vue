<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo e Título -->
      <div class="text-center">
        <router-link to="/" class="inline-block">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">iServ</h1>
        </router-link>
        <h2 class="text-2xl font-semibold text-gray-900">Recuperar Senha</h2>
        <p class="text-gray-600 mt-2">Enviaremos um link para redefinir sua senha</p>
      </div>

      <!-- Formulário -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Etapa 1: Solicitar Email -->
        <form v-if="step === 1" @submit.prevent="handleRequestReset" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Botão -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Enviar Link de Recuperação</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          </button>
        </form>

        <!-- Etapa 2: Email Enviado -->
        <div v-if="step === 2" class="text-center py-8">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-2">Email Enviado!</h3>
          <p class="text-gray-600 mb-6">
            Enviamos um link de recuperação para <strong>{{ email }}</strong>
          </p>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 mb-6">
            <p class="font-medium mb-2">📧 Verifique sua caixa de entrada</p>
            <p>O email pode levar alguns minutos para chegar. Não se esqueça de verificar a pasta de spam.</p>
          </div>

          <button
            @click="step = 1"
            class="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Não recebeu? Reenviar email
          </button>
        </div>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <!-- Link para Login -->
        <div class="text-center">
          <router-link
            to="/login"
            class="text-gray-900 font-semibold hover:underline"
          >
            Voltar para o Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1)
const email = ref('')
const loading = ref(false)
const error = ref('')

const handleRequestReset = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simulação de envio de email
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Verificar se email existe (simulação)
    if (email.value.includes('@')) {
      step.value = 2
    } else {
      error.value = 'Email inválido'
    }
  } catch (err) {
    error.value = 'Erro ao enviar email. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
