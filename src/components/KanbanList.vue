<template>
  <div class="list">
    <h2 class="list-title">{{ title }}</h2>
    <draggable
      v-model="cardList"
      class="cards-container"
      item-key="id"
      group="cards"
      ghost-class="ghost-card"
    >
      <template #item="{ element }">
        <KanbanCard :task="element" />
      </template>
    </draggable>
    <div class="cards-container" v-if="!cards || cards.length === 0">
      <div v-if="cards.length === 0" class="empty-list-message">Nenhum card aqui.</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import draggable from 'vuedraggable'
import KanbanCard from '/src/components/KanbanCard.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:cards'])

const cardList = computed({
  get: () => props.cards,
  set: (newValue) => emit('update:cards', newValue),
})
</script>

<style scoped>
.list {
  background-color: #f4f5f7;
  border-radius: 8px;
  width: 280px;
  padding: 10px;
  flex-shrink: 0; 
}

.list-title {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0 5px 10px;
  color: #172b4d;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 50px; 
}

.empty-list-message {
  text-align: center;
  color: #5e6c84;
  font-size: 0.9rem;
  padding: 15px;
}

.ghost-card {
  opacity: 0.5;
  background: #c8dceb;
}
</style>
