<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">🍔 Cardápio Digital</h1>

    <!-- Grade de produtos -->
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

            <button class="btn btn-primary btn-sm" @click="adicionarAoCarrinho(item)">
              Pedir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerta visual -->
    <div
      v-if="mensagem"
      class="toast toast-top toast-center transition-all duration-500"
    >
      <div class="alert alert-success">
        <span>{{ mensagem }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { carrinho } from '@/store/carrinho'

const mensagem = ref('')

const adicionarAoCarrinho = (item) => {
  carrinho.adicionar(item)
  mensagem.value = `${item.nome} foi adicionado ao carrinho!`
  setTimeout(() => (mensagem.value = ''), 2000)
}

const cardapio = [
  // 🍔 HAMBÚRGUERES
  {
    nome: "Cheeseburger Clássico",
    descricao: "Carne 150g, queijo cheddar, alface e tomate.",
    preco: 22.9,
    imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    novo: false,
  },
  {
    nome: "Bacon Burger",
    descricao: "Carne suculenta, bacon crocante e molho especial.",
    preco: 26.9,
    imagem: "https://ogimg.infoglobo.com.br/in/23479725-1b1-ff2/FT1086A/20180511DonninhaFotoVitor-Faria-media-1.jpg",
    novo: true,
  },
  {
    nome: "Duplo Smash",
    descricao: "Dois burgers 100g, queijo e molho da casa.",
    preco: 29.9,
    imagem: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    novo: false,
  },
  {
    nome: "Veggie Burger",
    descricao: "Hambúrguer vegetal, maionese verde e salada fresca.",
    preco: 24.5,
    imagem: "https://images.unsplash.com/photo-1606755962773-0e21a48e3cbb",
    novo: false,
  },
  {
    nome: "Cheddar Melt",
    descricao: "Carne 180g, cheddar cremoso e cebola caramelizada.",
    preco: 27.9,
    imagem: "https://img.freepik.com/fotos-gratis/vida-morta-de-um-delicioso-hamburguer-americano_23-2149637307.jpg?semt=ais_incoming&w=740&q=80",
    novo: false,
  },
  {
    nome: "Picanha Burguer",
    descricao: "Picanha grelhada, queijo prato e molho barbecue.",
    preco: 31.9,
    imagem: "https://ricksfoodservices.com/wp-content/uploads/2021/08/hamburguer-de-picanha.jpg",
    novo: true,
  },

  // 🥤 BEBIDAS
  {
    nome: "Refrigerante Lata",
    descricao: "Coca-Cola, Guaraná ou Pepsi (350ml).",
    preco: 6.0,
    imagem: "https://st4.depositphotos.com/1063437/29839/i/1600/depositphotos_298390728-stock-photo-a-glass-and-a-can.jpg",
    novo: false,
  },
  {
    nome: "Suco Natural de Laranja",
    descricao: "Suco natural espremido na hora.",
    preco: 8.5,
    imagem: "https://images.unsplash.com/photo-1571079129431-7c9c1a0b0a78",
    novo: false,
  },
  {
    nome: "Milkshake Chocolate",
    descricao: "Cremoso, com cobertura e chantilly.",
    preco: 12.9,
    imagem: "https://images.unsplash.com/photo-1626200414033-2a93e78a8e0c",
    novo: false,
  },
  {
    nome: "Café Gelado",
    descricao: "Café expresso com leite e gelo.",
    preco: 9.9,
    imagem: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    novo: false,
  },
  {
    nome: "Água Mineral",
    descricao: "Água natural ou com gás (500ml).",
    preco: 4.0,
    imagem: "https://images.unsplash.com/photo-1563306406-bd54e0e318d2",
    novo: false,
  },
  {
    nome: "Refrigerante 600ml",
    descricao: "Coca-Cola ou Guaraná Antarctica.",
    preco: 8.0,
    imagem: "https://images.unsplash.com/photo-1601050690597-3d7e24b76c5e",
    novo: false,
  },

  // 🍟 BATATAS FRITAS
  {
    nome: "Batata Clássica",
    descricao: "Porção de batata frita tradicional.",
    preco: 14.9,
    imagem: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
    novo: false,
  },
  {
    nome: "Batata com Cheddar e Bacon",
    descricao: "Porção generosa com cheddar cremoso e bacon crocante.",
    preco: 19.9,
    imagem: "https://images.unsplash.com/photo-1606756792954-86c8c3f9e4b8",
    novo: true,
  },
  {
    nome: "Batata Rústica",
    descricao: "Batata artesanal com casca e toque de alecrim.",
    preco: 17.9,
    imagem: "https://images.unsplash.com/photo-1585238341986-37a8b1b2935b",
    novo: false,
  },
]
</script>

<style scoped>
.toast {
  z-index: 50;
}
</style>





<script setup></script>

<style lang="scss" scoped></style>