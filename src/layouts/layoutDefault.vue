<template>
  <!-- Layout principal -->
  <div class="flex">
    <!-- Sidebar (Menu Lateral) -->
    <div class="w-64" v-show="slidebarAberto">
      <logo />
      <menu-lateral />
    </div>

    <!-- Conteúdo Principal -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Navbar Superior -->
      <nav-bar v-model:estaAberto="slidebarAberto" />

      <!-- Área de Conteúdo (Rotas) -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view></router-view>
        <!-- Em React/Vue, você colocaria <Outlet /> ou <router-view> aqui -->
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import menuLateral from "@/components/menuLateral.vue";
import logo from "@/components/logo.vue";
import navBar from "@/components/navBar.vue";
import { ref } from "vue";

const slidebarAberto = ref(false);
</script>

<style lang="scss" scoped></style>
