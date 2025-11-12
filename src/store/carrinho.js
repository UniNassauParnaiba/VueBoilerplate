import { reactive } from 'vue'

export const carrinho = reactive({
  itens: [],

  adicionar(item) {
    const existente = this.itens.find((i) => i.nome === item.nome)
    if (existente) {
      existente.quantidade++
    } else {
      this.itens.push({ ...item, quantidade: 1 })
    }
  },

  remover(item) {
    this.itens = this.itens.filter((i) => i.nome !== item.nome)
  },

  limpar() {
    this.itens = []
  },

  get total() {
    return this.itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0)
  },
})

