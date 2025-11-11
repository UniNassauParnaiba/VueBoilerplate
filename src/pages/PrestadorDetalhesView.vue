<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <button
          @click="$router.back()"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Coluna Principal -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Perfil do Prestador -->
          <div class="bg-white rounded-xl shadow-md p-8">
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div class="w-32 h-32 bg-gray-900 text-white rounded-full flex items-center justify-center text-4xl font-bold relative">
                  {{ prestador.initials }}
                  <span
                    v-if="prestador.verificado"
                    class="absolute bottom-0 right-0 w-10 h-10 bg-green-500 border-4 border-white rounded-full flex items-center justify-center"
                  >
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Informações -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-1">{{ prestador.nome }}</h1>
                    <p class="text-lg text-gray-600">{{ prestador.categoria }}</p>
                  </div>
                  <div v-if="prestador.verificado" class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Verificado
                  </div>
                </div>

                <!-- Avaliação -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="flex items-center">
                    <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= prestador.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-xl font-bold text-gray-900">{{ prestador.rating.toFixed(1) }}</span>
                  <span class="text-gray-500">({{ prestador.reviews }} avaliações)</span>
                </div>

                <!-- Estatísticas -->
                <div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p class="text-sm text-gray-600">Experiência</p>
                    <p class="text-lg font-semibold text-gray-900">{{ prestador.experiencia }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Serviços</p>
                    <p class="text-lg font-semibold text-gray-900">{{ prestador.totalServicos }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Taxa de Resposta</p>
                    <p class="text-lg font-semibold text-gray-900">{{ prestador.taxaResposta }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sobre -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Sobre</h2>
            <p class="text-gray-700 leading-relaxed">{{ prestador.descricao }}</p>
          </div>

          <!-- Serviços Oferecidos -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Serviços Oferecidos</h2>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="servico in prestador.servicos"
                :key="servico"
                class="flex items-center gap-2 p-3 border border-gray-200 rounded-lg"
              >
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ servico }}</span>
              </div>
            </div>
          </div>

          <!-- Portfólio -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Portfólio</h2>
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="i in 6"
                :key="i"
                class="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
              >
                <div class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Avaliações -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Avaliações de Clientes</h2>

            <div class="space-y-6">
              <div
                v-for="avaliacao in avaliacoes"
                :key="avaliacao.id"
                class="pb-6 border-b border-gray-200 last:border-0 last:pb-0"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {{ avaliacao.clienteInitials }}
                  </div>

                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <div>
                        <p class="font-semibold text-gray-900">{{ avaliacao.cliente }}</p>
                        <div class="flex items-center gap-2 mt-1">
                          <div class="flex">
                            <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= avaliacao.nota ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <span class="text-sm text-gray-500">{{ avaliacao.data }}</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-700">{{ avaliacao.comentario }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button class="w-full mt-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
              Ver Todas as Avaliações
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6 sticky top-6 space-y-6">
            <!-- Preço -->
            <div class="text-center pb-6 border-b border-gray-200">
              <p class="text-sm text-gray-600 mb-1">A partir de</p>
              <p class="text-4xl font-bold text-gray-900">R$ {{ prestador.preco }}</p>
              <p class="text-sm text-gray-500">por hora</p>
            </div>

            <!-- Botão Principal -->
            <button
              @click="handleSolicitar"
              class="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Solicitar Serviço
            </button>

            <!-- Botão Secundário -->
            <button class="w-full border-2 border-gray-900 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Enviar Mensagem
            </button>

            <!-- Informações de Contato -->
            <div class="pt-6 border-t border-gray-200 space-y-3">
              <div class="flex items-center gap-3 text-gray-700">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{{ prestador.localizacao }}</span>
              </div>

              <div class="flex items-center gap-3 text-gray-700">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Responde em até {{ prestador.tempoResposta }}</span>
              </div>

              <div class="flex items-center gap-3 text-gray-700">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Atende em raio de {{ prestador.raioAtendimento }}km</span>
              </div>
            </div>

            <!-- Compartilhar -->
            <div class="pt-6 border-t border-gray-200">
              <p class="text-sm font-medium text-gray-700 mb-3">Compartilhar</p>
              <div class="flex gap-2">
                <button class="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                  <svg class="w-5 h-5 mx-auto text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button class="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                  <svg class="w-5 h-5 mx-auto text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button class="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                  <svg class="w-5 h-5 mx-auto text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Dados mockados do prestador
const prestador = ref({
  id: route.params.id,
  nome: 'João Silva',
  initials: 'JS',
  categoria: 'Eletricista',
  rating: 4.9,
  reviews: 127,
  localizacao: 'São Paulo, SP',
  experiencia: '8 anos',
  preco: '80',
  totalServicos: 147,
  taxaResposta: '98%',
  tempoResposta: '2h',
  raioAtendimento: 15,
  verificado: true,
  descricao: 'Eletricista profissional com mais de 8 anos de experiência no mercado. Especializado em instalações residenciais e comerciais, manutenção preventiva e corretiva, automação residencial e projetos elétricos. Atendimento de qualidade com garantia dos serviços prestados.',
  servicos: [
    'Instalação Elétrica',
    'Manutenção Elétrica',
    'Troca de Fiação',
    'Instalação de Luminárias',
    'Quadro de Distribuição',
    'Automação Residencial'
  ]
})

const avaliacoes = ref([
  {
    id: 1,
    cliente: 'Maria Santos',
    clienteInitials: 'MS',
    nota: 5,
    comentario: 'Excelente profissional! Muito pontual, educado e o serviço ficou perfeito. Recomendo!',
    data: 'Há 2 semanas'
  },
  {
    id: 2,
    cliente: 'Carlos Mendes',
    clienteInitials: 'CM',
    nota: 5,
    comentario: 'Ótimo trabalho! Resolveu o problema rapidamente e deixou tudo muito organizado.',
    data: 'Há 1 mês'
  },
  {
    id: 3,
    cliente: 'Ana Paula',
    clienteInitials: 'AP',
    nota: 4,
    comentario: 'Bom profissional, serviço de qualidade. Apenas demorou um pouco mais que o esperado.',
    data: 'Há 2 meses'
  }
])

const handleSolicitar = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  if (isAuthenticated) {
    // Redirecionar para página de solicitação
    router.push({ name: 'home' }) // Trocar depois para rota de solicitação
  } else {
    router.push({ name: 'login' })
  }
}
</script>
