<template>
  <!-- Layout principal -->
  <div class="flex">
    <!-- Sidebar (Menu Lateral) -->
    <div class="w-64">
      <div class="p-4">
        <h2 class="text-xl font-bold">Logo</h2>
      </div>
      <div class="mx-3">
        <ul class="menu bg-base-200 rounded-box w-56">
          <li><a>Tutores</a></li>
          <li><a>Pets</a></li>
        </ul>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Navbar Superior -->
      <div class="navbar bg-base-300 shadow">
        <div class="flex-1">
          <a class="mx-4 text-xl">Meu App</a>
        </div>
        <div class="flex-none">
          <button class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.161 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </button>
        </div>
      </div>

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
</script>

<style lang="scss" scoped></style>
