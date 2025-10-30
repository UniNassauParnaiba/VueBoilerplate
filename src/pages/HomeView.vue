<template>
  <div class="flex flex-col gap-20 justify-center items-center text-center">
    <h1 class="text-6xl">Encontre o profissional para o serviço que deseja!</h1>


      <div class="relative w-full max-w-4xl">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>

      <input type="text" placeholder="Buscar por serviços ou prestadores..."
          class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ">
      </div>

        <CardsCategories/>

      <RouterView/>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>


