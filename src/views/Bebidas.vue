<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center"></h1>

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
    imagem: "https://veja.abril.com.br/wp-content/uploads/2024/02/suco-laranja.jpg?crop=1&resize=1212,909",
    novo: false,
  },
  {
    nome: "Milkshake Chocolate",
    descricao: "Cremoso, com cobertura e chantilly.",
    preco: 12.9,
    imagem: "https://receitas.wap.ind.br/wp-content/uploads/2025/03/milkshake-de-chocolate.jpg",
    novo: false,
  },
  {
    nome: "Cerveja",
    descricao: "Cerveja heineken long neck",
    preco: 9.9,
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfYaLs6pdj_vj49mj9vRdpXcovAy-dGjZIQ&s",
    novo: false,
  },
  {
    nome: "Água Mineral",
    descricao: "Água natural ou com gás (500ml).",
    preco: 4.0,
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_rz4Gos6x74EONCPk8cQXZXYZAsz8yhpHA&s",
    novo: false,
  },
  {
    nome: "Refrigerante 600ml",
    descricao: "Coca-Cola ou Guaraná Antarctica.",
    preco: 8.0,
    imagem: "https://alloydeliveryimages.s3.sa-east-1.amazonaws.com/item_images/623affe9779bf.webp",
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