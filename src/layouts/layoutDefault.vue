<template>
  <!-- Layout principal -->
  <div class="flex h-screen bg-white">
    <!-- Sidebar (Menu Lateral) -->
    <MenuLateral :isOpen="isSideBarOpen"/>
    <!-- Conteúdo Principal -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Navbar Superior -->
      <NavBar @toggle-menu="toggleSideBar" />
      <!-- Área de Conteúdo (Rotas) -->
      <main class="flex-1 overflow-y-auto px-30">
        
        
        <router-view></router-view>

        <!-- Em React/Vue, você colocaria <Outlet /> ou <router-view> aqui -->
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";

const isSideBarOpen = ref(false);

function toggleSideBar() {
  isSideBarOpen.value = !isSideBarOpen.value;
}


</script> <style lang="scss" scoped></style>
