<template>
  <div class="card">
    <p>{{ task.title }}</p>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 5px;
  padding: 12px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
