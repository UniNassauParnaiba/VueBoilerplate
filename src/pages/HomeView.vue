<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Categorias -->
    <CardsCategories />

    <!-- Prestadores em Destaque -->
    <FeaturedProviders />

    <!-- Seção de Como Funciona -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-3">Como Funciona</h2>
          <p class="text-gray-600">Encontre o profissional ideal em 3 passos simples</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Passo 1 -->
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
              1
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Busque o Serviço</h3>
            <p class="text-gray-600">
              Digite o serviço que precisa e escolha a categoria adequada
            </p>
          </div>

          <!-- Passo 2 -->
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
              2
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Compare Profissionais</h3>
            <p class="text-gray-600">
              Veja perfis, avaliações e preços dos prestadores disponíveis
            </p>
          </div>

          <!-- Passo 3 -->
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
              3
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Contrate com Segurança</h3>
            <p class="text-gray-600">
              Entre em contato e agende o serviço de forma rápida e segura
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 px-4 bg-gray-900 text-white">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <h2 class="text-4xl font-bold">Você é um Prestador de Serviços?</h2>
        <p class="text-xl text-gray-300">
          Cadastre-se gratuitamente e comece a receber solicitações de clientes hoje mesmo!
        </p>
        <div class="flex flex-wrap gap-4 justify-center mt-8">
          <button class="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105">
            Cadastrar como Prestador
          </button>
          <button class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
            Saiba Mais
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />

    <RouterView />
  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue'
import CardsCategories from '@/components/CardsCategories.vue'
import FeaturedProviders from '@/components/FeaturedProviders.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
</style>
