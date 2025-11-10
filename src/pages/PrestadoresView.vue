<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header de Busca -->
    <div class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="space-y-4">
          <!-- Barra de Pesquisa -->
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por serviço ou prestador..."
              class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              @input="handleSearch"
            />
          </div>

          <!-- Filtros -->
          <div class="flex flex-wrap gap-3">
            <!-- Categoria -->
            <select
              v-model="filters.categoria"
              @change="applyFilters"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-sm"
            >
              <option value="">Todas Categorias</option>
              <option value="Construção Civil">Construção Civil</option>
              <option value="Eletricista">Eletricista</option>
              <option value="Encanador">Encanador</option>
              <option value="Pintura">Pintura</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Jardinagem">Jardinagem</option>
            </select>

            <!-- Avaliação -->
            <select
              v-model="filters.avaliacao"
              @change="applyFilters"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-sm"
            >
              <option value="">Qualquer Avaliação</option>
              <option value="5">5 estrelas</option>
              <option value="4">4+ estrelas</option>
              <option value="3">3+ estrelas</option>
            </select>

            <!-- Ordenação -->
            <select
              v-model="filters.ordenacao"
              @change="applyFilters"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-sm"
            >
              <option value="relevancia">Mais Relevantes</option>
              <option value="avaliacao">Melhor Avaliados</option>
              <option value="preco-menor">Menor Preço</option>
              <option value="preco-maior">Maior Preço</option>
            </select>

            <!-- Botão Limpar Filtros -->
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Resultado da Busca -->
      <div class="mb-6">
        <p class="text-gray-600">
          Encontrados <strong class="text-gray-900">{{ filteredPrestadores.length }}</strong> prestadores
          <span v-if="searchQuery"> para "<strong>{{ searchQuery }}</strong>"</span>
        </p>
      </div>

      <!-- Grid de Prestadores -->
      <div v-if="filteredPrestadores.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="prestador in filteredPrestadores"
          :key="prestador.id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          @click="goToDetails(prestador.id)"
        >
          <!-- Header do Card -->
          <div class="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-white shadow-lg">
                {{ prestador.initials }}
              </div>
            </div>

            <!-- Badge Verificado -->
            <div v-if="prestador.verificado" class="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Verificado
            </div>

            <!-- Badge Categoria -->
            <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
              {{ prestador.categoria }}
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="p-5">
            <!-- Nome e Avaliação -->
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ prestador.nome }}</h3>

            <div class="flex items-center gap-2 mb-3">
              <div class="flex items-center">
                <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= prestador.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-gray-700">{{ prestador.rating.toFixed(1) }}</span>
              <span class="text-sm text-gray-500">({{ prestador.reviews }})</span>
            </div>

            <!-- Descrição -->
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">
              {{ prestador.descricao }}
            </p>

            <!-- Informações -->
            <div class="space-y-2 mb-4 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ prestador.localizacao }}
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ prestador.experiencia }} de experiência
              </div>
            </div>

            <!-- Preço e Ação -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p class="text-xs text-gray-500">A partir de</p>
                <p class="text-xl font-bold text-gray-900">R$ {{ prestador.preco }}</p>
              </div>
              <button class="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm">
                Ver Perfil
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Nenhum Resultado -->
      <div v-else class="text-center py-16">
        <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Nenhum prestador encontrado</h3>
        <p class="text-gray-600 mb-6">Tente ajustar seus filtros ou busca</p>
        <button
          @click="clearFilters"
          class="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const filters = ref({
  categoria: '',
  avaliacao: '',
  ordenacao: 'relevancia'
})

// Dados mockados de prestadores
const prestadores = ref([
  {
    id: 1,
    nome: 'João Silva',
    initials: 'JS',
    categoria: 'Eletricista',
    rating: 4.9,
    reviews: 127,
    localizacao: 'São Paulo, SP',
    experiencia: '8 anos',
    preco: '80/h',
    descricao: 'Eletricista profissional com vasta experiência em instalações residenciais e comerciais.',
    verificado: true
  },
  {
    id: 2,
    nome: 'Maria Santos',
    initials: 'MS',
    categoria: 'Encanador',
    rating: 5.0,
    reviews: 89,
    localizacao: 'Rio de Janeiro, RJ',
    experiencia: '12 anos',
    preco: '90/h',
    descricao: 'Especialista em reparos e instalações hidráulicas. Atendimento rápido e eficiente.',
    verificado: true
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    initials: 'PC',
    categoria: 'Pintura',
    rating: 4.8,
    reviews: 156,
    localizacao: 'Belo Horizonte, MG',
    experiencia: '6 anos',
    preco: '70/h',
    descricao: 'Pintor profissional especializado em acabamentos de alta qualidade.',
    verificado: true
  },
  {
    id: 4,
    nome: 'Ana Oliveira',
    initials: 'AO',
    categoria: 'Limpeza',
    rating: 4.9,
    reviews: 94,
    localizacao: 'Curitiba, PR',
    experiencia: '10 anos',
    preco: '60/h',
    descricao: 'Serviços de limpeza residencial e comercial com produtos ecológicos.',
    verificado: true
  },
  {
    id: 5,
    nome: 'Carlos Mendes',
    initials: 'CM',
    categoria: 'Construção Civil',
    rating: 4.7,
    reviews: 213,
    localizacao: 'Salvador, BA',
    experiencia: '15 anos',
    preco: '120/h',
    descricao: 'Mestre de obras com experiência em reformas e construções.',
    verificado: false
  },
  {
    id: 6,
    nome: 'Juliana Lima',
    initials: 'JL',
    categoria: 'Jardinagem',
    rating: 5.0,
    reviews: 67,
    localizacao: 'Fortaleza, CE',
    experiencia: '5 anos',
    preco: '55/h',
    descricao: 'Jardineira profissional com experiência em paisagismo e manutenção.',
    verificado: true
  }
])

const filteredPrestadores = computed(() => {
  let result = [...prestadores.value]

  // Filtro de busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.nome.toLowerCase().includes(query) ||
      p.categoria.toLowerCase().includes(query) ||
      p.descricao.toLowerCase().includes(query)
    )
  }

  // Filtro de categoria
  if (filters.value.categoria) {
    result = result.filter(p => p.categoria === filters.value.categoria)
  }

  // Filtro de avaliação
  if (filters.value.avaliacao) {
    const minRating = parseFloat(filters.value.avaliacao)
    result = result.filter(p => p.rating >= minRating)
  }

  // Ordenação
  switch (filters.value.ordenacao) {
    case 'avaliacao':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'preco-menor':
      result.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco))
      break
    case 'preco-maior':
      result.sort((a, b) => parseFloat(b.preco) - parseFloat(a.preco))
      break
  }

  return result
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || filters.value.categoria || filters.value.avaliacao || filters.value.ordenacao !== 'relevancia'
})

const handleSearch = () => {
  // Busca em tempo real já implementada via computed
}

const applyFilters = () => {
  // Filtros aplicados automaticamente via computed
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {
    categoria: '',
    avaliacao: '',
    ordenacao: 'relevancia'
  }
}

const goToDetails = (id) => {
  router.push({ name: 'prestador-detalhes', params: { id } })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
