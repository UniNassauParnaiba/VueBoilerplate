<template>
  <div class="mx-3">
    <ul class="menu bg-base-200 rounded-box w-56">
      <li><router-link :to="{ name: 'tutors.index' }">Tutores</router-link></li>
      <li><router-link :to="{ name: 'pets.index' }">Animais</router-link></li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
