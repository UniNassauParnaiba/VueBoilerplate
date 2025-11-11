<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-2xl w-full text-center">
      <!-- Ilustração 404 -->
      <div class="mb-8">
        <div class="relative inline-block">
          <!-- Número 404 -->
          <h1 class="text-[180px] font-bold text-gray-200 leading-none select-none">
            404
          </h1>

          <!-- Ícone de busca animado -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
            <svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Mensagem -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">
          Ops! Página não encontrada
        </h2>
        <p class="text-lg text-gray-600 mb-2">
          A página que você está procurando não existe ou foi movida.
        </p>
        <p class="text-gray-500">
          Verifique se o endereço está correto ou volte para a página inicial.
        </p>
      </div>

      <!-- Botões de Ação -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <router-link
          to="/"
          class="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Voltar para Início
        </router-link>

        <button
          @click="$router.back()"
          class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>
      </div>

      <!-- Links Úteis -->
      <div class="bg-white rounded-xl shadow-md p-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Páginas que você pode estar procurando:
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <router-link
            to="/"
            class="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-left"
          >
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <div>
              <p class="font-medium text-gray-900">Página Inicial</p>
              <p class="text-sm text-gray-500">Encontre serviços</p>
            </div>
          </router-link>

          <router-link
            to="/prestadores"
            class="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-left"
          >
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div>
              <p class="font-medium text-gray-900">Prestadores</p>
              <p class="text-sm text-gray-500">Ver todos</p>
            </div>
          </router-link>

          <router-link
            to="/login"
            class="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-left"
          >
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <div>
              <p class="font-medium text-gray-900">Login</p>
              <p class="text-sm text-gray-500">Acessar conta</p>
            </div>
          </router-link>

          <router-link
            to="/escolher-cadastro"
            class="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-left"
          >
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <div>
              <p class="font-medium text-gray-900">Cadastrar</p>
              <p class="text-sm text-gray-500">Criar conta</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Ajuda -->
      <div class="mt-8 text-center">
        <p class="text-gray-600 mb-2">Precisa de ajuda?</p>
        <a href="#" class="text-gray-900 font-semibold hover:underline">
          Entre em contato conosco
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-20px) translateX(-50%);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
