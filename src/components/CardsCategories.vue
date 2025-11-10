<template>
  <div class="w-full flex flex-col justify-center items-center px-4 py-12">
    <!-- Título da Seção -->
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-gray-900 mb-3">Categorias de Serviços</h2>
      <p class="text-gray-600">Escolha a categoria do serviço que você procura</p>
    </div>

    <!-- Grid de Cards -->
    <div class="grid gap-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full max-w-7xl">
      <div
        v-for="categorie in Categorias"
        :key="categorie.name"
        @click="handleCategoriaClick(categorie)"
        class="group relative flex flex-col justify-center items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-300"
      >
        <!-- Ícone com cor de destaque -->
        <div
          class="w-16 h-16 mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
          :style="{ backgroundColor: categorie.color + '20' }"
        >
          <component :is="categorie.icon" class="w-8 h-8" :style="{ color: categorie.color }" />
        </div>

        <!-- Nome da categoria -->
        <p class="text-center font-semibold text-gray-800 mb-2">
          {{ categorie.name }}
        </p>

        <!-- Número de profissionais -->
        <p class="text-sm text-gray-500">
          {{ categorie.count }} profissionais
        </p>

        <!-- Badge "Popular" para algumas categorias -->
        <span
          v-if="categorie.popular"
          class="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full"
        >
                    Popular
                </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  WrenchScrewdriverIcon,
  BoltIcon,
  BeakerIcon,
  PaintBrushIcon,
  SparklesIcon,
  ScissorsIcon,
  HomeModernIcon,
  CakeIcon,
  AcademicCapIcon
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

const Categorias = [
  { name: 'Construção Civil', icon: HomeModernIcon, color: '#f59e0b', count: 89, popular: true },
  { name: 'Reparos e Manutenção', icon: WrenchScrewdriverIcon, color: '#3b82f6', count: 127, popular: true },
  { name: 'Eletricista', icon: BoltIcon, color: '#eab308', count: 64 },
  { name: 'Encanador', icon: BeakerIcon, color: '#06b6d4', count: 52 },
  { name: 'Pintura', icon: PaintBrushIcon, color: '#8b5cf6', count: 73 },
  { name: 'Limpeza', icon: SparklesIcon, color: '#10b981', count: 95, popular: true },
  { name: 'Jardinagem', icon: ScissorsIcon, color: '#22c55e', count: 41 },
  { name: 'Culinária', icon: CakeIcon, color: '#ef4444', count: 38 },
  { name: 'Beleza e Estética', icon: ScissorsIcon, color: '#ec4899', count: 56 },
  { name: 'Educação', icon: AcademicCapIcon, color: '#6366f1', count: 47 },
];

const handleCategoriaClick = (categoria) => {
  router.push({
    path: '/prestadores',
    query: { categoria: categoria.name }
  })
}
</script>
