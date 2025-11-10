<template>
  <div class="relative w-full max-w-2xl group">
    <!-- Ícone de pesquisa -->
    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-gray-900 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </span>

    <!-- Input de pesquisa -->
    <input
      type="text"
      placeholder="Buscar por serviços ou prestadores..."
      style="background-color: rgb(243, 244, 246); border: 2px solid rgb(156, 163, 175);"
      class="w-full pl-12 pr-4 py-4 rounded-2xl shadow-md
           focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-600 focus:bg-white
           transition-all duration-300 text-gray-900 placeholder:text-gray-600
           hover:border-gray-500 hover:shadow-lg hover:bg-gray-50"
    >

    <!-- Botão de filtro (opcional) -->
    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-700 text-white rounded-xl
                   hover:bg-gray-800 transition-colors duration-200 shadow-md hover:shadow-lg
                   flex items-center gap-2 font-medium"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      <span class="hidden sm:inline">Filtros</span>
    </button>
  </div>
</template>
