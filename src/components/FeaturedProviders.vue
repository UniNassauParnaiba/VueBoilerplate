<template>
  <div class="w-full bg-gray-50 py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Título da Seção -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Profissionais em Destaque</h2>
        <p class="text-gray-600">Conheça os prestadores mais bem avaliados da plataforma</p>
      </div>

      <!-- Grid de Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="provider in providers"
          :key="provider.id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-105"
        >
          <!-- Header do Card com Foto -->
          <div class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white shadow-lg">
                {{ provider.initials }}
              </div>
            </div>
            <!-- Badge de Verificado -->
            <div v-if="provider.verified" class="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Verificado
            </div>
          </div>

          <!-- Conteúdo do Card -->
          <div class="p-6">
            <!-- Nome e Categoria -->
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ provider.name }}</h3>
            <p class="text-gray-600 text-sm mb-3">{{ provider.category }}</p>

            <!-- Avaliação -->
            <div class="flex items-center gap-2 mb-4">
              <div class="flex items-center">
                <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= provider.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-gray-700 font-semibold">{{ provider.rating.toFixed(1) }}</span>
              <span class="text-gray-500 text-sm">({{ provider.reviews }} avaliações)</span>
            </div>

            <!-- Informações Extras -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-gray-600 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ provider.location }}
              </div>
              <div class="flex items-center gap-2 text-gray-600 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ provider.experience }} anos de experiência
              </div>
            </div>

            <!-- Preço e Botão -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p class="text-xs text-gray-500">A partir de</p>
                <p class="text-2xl font-bold text-gray-900">{{ provider.price }}</p>
              </div>
              <button class="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Ver Perfil
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botão Ver Mais -->
      <div class="text-center mt-10">
        <button class="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
          Ver Todos os Profissionais
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const providers = [
  {
    id: 1,
    name: 'João Silva',
    initials: 'JS',
    category: 'Eletricista',
    rating: 4.9,
    reviews: 127,
    location: 'São Paulo, SP',
    experience: 8,
    price: 'R$ 80',
    verified: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    initials: 'MS',
    category: 'Encanadora',
    rating: 5.0,
    reviews: 89,
    location: 'Rio de Janeiro, RJ',
    experience: 12,
    price: 'R$ 90',
    verified: true
  },
  {
    id: 3,
    name: 'Pedro Costa',
    initials: 'PC',
    category: 'Pintor',
    rating: 4.8,
    reviews: 156,
    location: 'Belo Horizonte, MG',
    experience: 6,
    price: 'R$ 70',
    verified: true
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    initials: 'AO',
    category: 'Designer de Interiores',
    rating: 4.9,
    reviews: 94,
    location: 'Curitiba, PR',
    experience: 10,
    price: 'R$ 150',
    verified: true
  },
  {
    id: 5,
    name: 'Carlos Mendes',
    initials: 'CM',
    category: 'Construção Civil',
    rating: 4.7,
    reviews: 213,
    location: 'Salvador, BA',
    experience: 15,
    price: 'R$ 120',
    verified: false
  },
  {
    id: 6,
    name: 'Juliana Lima',
    initials: 'JL',
    category: 'Jardineira',
    rating: 5.0,
    reviews: 67,
    location: 'Fortaleza, CE',
    experience: 5,
    price: 'R$ 60',
    verified: true
  }
];
</script>
