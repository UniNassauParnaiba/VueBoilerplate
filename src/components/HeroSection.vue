<template>
  <div class="flex flex-col gap-8 justify-center items-center text-center py-12 px-4">
    <!-- Título e Subtítulo -->
    <div class="space-y-4 animate-fade-in">
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
        ENCONTRE O PROFISSIONAL PARA O<br>SERVIÇO QUE DESEJA!
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Conectamos você aos melhores prestadores de serviço da sua região.
        Rápido, seguro e com avaliações verificadas.
      </p>
    </div>

    <!-- Barra de Pesquisa -->
    <div class="w-full flex justify-center">
      <BarraPesquisa />
    </div>

    <!-- Botões de Ação -->
    <div class="flex flex-wrap gap-4 justify-center mt-4">
      <button
        @click="buscarProfissional"
        class="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Buscar Profissional
      </button>

      <button
        @click="cadastrarPrestador"
        class="px-8 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-semibold hover:border-gray-900 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Cadastrar como Prestador
      </button>
    </div>

    <!-- Estatísticas Destacadas - Estilo GetNinjas -->
    <div class="w-full max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      <!-- Estatística 1 -->
      <div class="text-center">
        <div class="mb-4">
          <h3 class="text-5xl font-bold text-gray-900 mb-2">500+</h3>
          <div class="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mx-auto"></div>
        </div>
        <p class="text-gray-600 text-lg leading-relaxed">
          Profissionais cadastrados na plataforma do iServ.
        </p>
      </div>

      <!-- Estatística 2 -->
      <div class="text-center">
        <div class="mb-4">
          <h3 class="text-5xl font-bold text-gray-900 mb-2">1.2k+</h3>
          <div class="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mx-auto"></div>
        </div>
        <p class="text-gray-600 text-lg leading-relaxed">
          Serviços solicitados por ano na plataforma do iServ.
        </p>
      </div>

      <!-- Estatística 3 -->
      <div class="text-center">
        <div class="mb-4">
          <h3 class="text-5xl font-bold text-gray-900 mb-2">4.8★</h3>
          <div class="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mx-auto"></div>
        </div>
        <p class="text-gray-600 text-lg leading-relaxed">
          Avaliação média dos serviços contratados pelo iServ.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BarraPesquisa from './BarraPesquisa.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const buscarProfissional = () => {
  router.push('/prestadores')
}

const cadastrarPrestador = () => {
  router.push('/cadastro/prestador')
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
