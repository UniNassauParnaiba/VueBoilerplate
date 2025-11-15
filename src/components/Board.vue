<template>
  <div class="board-container">
    <header class="board-header">
      <h1>Easy Kamban</h1>
    </header>
    <main class="board">
      <KanbanList
        v-for="list in boardData"
        :key="list.id"
        :title="list.title"
        v-model:cards="list.cards"
      />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import KanbanList from '/src/components/KanbanList.vue'

const boardData = ref([
  {
    id: 1,
    title: 'A Fazer',
    cards: [
      { id: 101, title: 'Analisar requisitos do projeto' },
      { id: 102, title: 'Criar layout no Figma' },
    ],
  },
  {
    id: 2,
    title: 'Em Andamento',
    cards: [{ id: 103, title: 'Desenvolver componente Board.vue' }],
  },
  {
    id: 3,
    title: 'Concluído',
    cards: [],
  },
])
</script>

<style scoped>
.board-container {
  padding: 20px;
}
.board {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  overflow-x: auto; 
  padding-bottom: 20px;
}
</style>
