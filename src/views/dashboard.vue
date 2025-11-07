<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">🍔 Cardápio Digital</h1>

    <!-- Grade de 3 colunas (responsiva) -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(item, index) in cardapio"
        :key="index"
        class="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <figure>
          <img
            :src="item.imagem"
            :alt="item.nome"
            class="h-56 w-full object-cover"
          />
        </figure>

        <div class="card-body">
          <h2 class="card-title">
            {{ item.nome }}
            <div v-if="item.novo" class="badge badge-secondary">Novo</div>
          </h2>

          <p>{{ item.descricao }}</p>

          <div class="card-actions justify-between items-center mt-2">
            <span class="font-bold text-lg">R$ {{ item.preco.toFixed(2) }}</span>
            <button class="btn btn-primary btn-sm">Pedir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cardapio = [
  {
    nome: "Hambúrguer Artesanal",
    descricao: "Pão brioche, carne 180g, queijo e molho especial.",
    preco: 24.9,
    imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    novo: true,
  },
  {
    nome: "Pizza Calabresa",
    descricao: "Queijo derretido, calabresa e orégano.",
    preco: 39.9,
    imagem: "https://images.unsplash.com/photo-1601924582971-c9e8b4f5a3bb",
    novo: false,
  },
  {
    nome: "Suco Natural",
    descricao: "Refrescante suco natural de laranja.",
    preco: 9.9,
    imagem: "https://images.unsplash.com/photo-1571079129431-7c9c1a0b0a78",
    novo: false,
  },
  {
    nome: "Batata Frita",
    descricao: "Porção crocante de batatas com sal temperado.",
    preco: 14.9,
    imagem: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
    novo: false,
  },
  {
    nome: "Açaí na Tigela",
    descricao: "Açaí cremoso com granola e banana.",
    preco: 17.5,
    imagem: "https://images.unsplash.com/photo-1617196034796-73f0d11d8f55",
    novo: true,
  },
  {
    nome: "Café Gelado",
    descricao: "Café expresso com leite e gelo.",
    preco: 8.9,
    imagem: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    novo: false,
  },
];
</script>
</template>


<script setup></script>

<style lang="scss" scoped></style>
