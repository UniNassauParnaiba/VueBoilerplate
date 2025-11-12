<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">🛒 Meu Carrinho</h1>

    <div v-if="carrinho.itens.length">
      <div
        v-for="(item, i) in carrinho.itens"
        :key="i"
        class="flex justify-between items-center mb-4 p-3 bg-base-200 rounded-lg"
      >
        <div>
          <p class="font-semibold">{{ item.nome }} (x{{ item.quantidade }})</p>
          <p class="text-sm text-gray-500">R$ {{ item.preco.toFixed(2) }}</p>
        </div>
        <button class="btn btn-error btn-sm" @click="carrinho.remover(item)">Remover</button>
      </div>

      <div class="text-right mt-6">
        <h2 class="text-xl font-bold">Total: R$ {{ carrinho.total.toFixed(2) }}</h2>
        <button class="btn btn-primary mt-3">Finalizar Pedido</button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">
      Seu carrinho está vazio 😢
    </div>
  </div>
</template>

<script setup>
import { carrinho } from '@/store/carrinho'
</script>
