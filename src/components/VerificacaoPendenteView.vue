<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Cabeçalho -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block mb-4">
          <h1 class="text-4xl font-bold text-gray-900">iServ</h1>
        </router-link>
      </div>

      <!-- Card Principal -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Status Pendente -->
        <div v-if="statusVerificacao === 'pendente'" class="text-center">
          <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mb-3">Cadastro em Análise</h2>
          <p class="text-gray-600 mb-8 text-lg">
            Seus documentos estão sendo verificados pela nossa equipe
          </p>

          <!-- Timeline -->
          <div class="max-w-md mx-auto mb-8">
            <div class="space-y-4">
              <!-- Etapa 1 - Completa -->
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div class="flex-1 text-left">
                  <p class="font-semibold text-gray-900">Cadastro Realizado</p>
                  <p class="text-sm text-gray-500">{{ formatarData(dataCadastro) }}</p>
                </div>
              </div>

              <!-- Etapa 2 - Em andamento -->
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div class="flex-1 text-left">
                  <p class="font-semibold text-gray-900">Verificação de Documentos</p>
                  <p class="text-sm text-gray-500">Em andamento</p>
                </div>
              </div>

              <!-- Etapa 3 - Pendente -->
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
                <div class="flex-1 text-left">
                  <p class="font-semibold text-gray-400">Aprovação Final</p>
                  <p class="text-sm text-gray-400">Aguardando etapa anterior</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Informações -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <div class="text-sm text-blue-800">
                <p class="font-semibold mb-2">Próximos Passos:</p>
                <ul class="space-y-1 list-disc list-inside">
                  <li>O processo de verificação leva em média 1-2 dias úteis</li>
                  <li>Você receberá um email quando a análise for concluída</li>
                  <li>Enquanto isso, você pode explorar a plataforma</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Botões -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="verificarStatus"
              :disabled="verificando"
              class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:bg-gray-400"
            >
              <span v-if="!verificando">Atualizar Status</span>
              <span v-else>Verificando...</span>
            </button>
            <router-link
              to="/"
              class="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all text-center"
            >
              Voltar ao Início
            </router-link>
          </div>
        </div>

        <!-- Status Aprovado -->
        <div v-if="statusVerificacao === 'aprovado'" class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mb-3">Conta Aprovada!</h2>
          <p class="text-gray-600 mb-8 text-lg">
            Parabéns! Sua conta foi verificada e aprovada
          </p>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-left mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <div class="text-sm text-green-800">
                <p class="font-semibold mb-2">Agora você pode:</p>
                <ul class="space-y-1 list-disc list-inside">
                  <li>Receber solicitações de serviço</li>
                  <li>Gerenciar seu perfil profissional</li>
                  <li>Interagir com clientes</li>
                  <li>Receber avaliações</li>
                </ul>
              </div>
            </div>
          </div>

          <router-link
            to="/prestador/dashboard"
            class="block w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all text-center"
          >
            Acessar Painel
          </router-link>
        </div>

        <!-- Status Recusado -->
        <div v-if="statusVerificacao === 'recusado'" class="text-center">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mb-3">Verificação Não Aprovada</h2>
          <p class="text-gray-600 mb-8 text-lg">
            Infelizmente, não conseguimos aprovar seu cadastro
          </p>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-left mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="text-sm text-red-800">
                <p class="font-semibold mb-2">Motivo da Recusa:</p>
                <p>{{ motivoRecusa }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="tentarNovamente"
              class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Enviar Novamente
            </button>
            <button
              @click="entrarContato"
              class="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Entrar em Contato
            </button>
          </div>
        </div>
      </div>

      <!-- Card de Ajuda -->
      <div class="mt-6 bg-white rounded-lg shadow p-6">
        <h3 class="font-semibold text-gray-900 mb-3">Precisa de ajuda?</h3>
        <p class="text-gray-600 text-sm mb-4">
          Se tiver dúvidas sobre o processo de verificação, entre em contato com nosso suporte.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 text-sm">
          <a href="mailto:suporte@iserv.com" class="flex items-center gap-2 text-gray-900 hover:underline">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            suporte@iserv.com
          </a>
          <a href="https://wa.me/5500000000000" class="flex items-center gap-2 text-gray-900 hover:underline">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const statusVerificacao = ref('pendente') // pendente, aprovado, recusado
const dataCadastro = ref(new Date())
const motivoRecusa = ref('Documentos ilegíveis ou incompletos. Por favor, envie fotos nítidas de todos os documentos solicitados.')
const verificando = ref(false)

onMounted(() => {
  // Carregar informações do usuário
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (user.statusVerificacao) {
    statusVerificacao.value = user.statusVerificacao
  }
  if (user.dataCadastro) {
    dataCadastro.value = new Date(user.dataCadastro)
  }

  // Se já estiver aprovado, redirecionar
  if (user.verificado) {
    router.push({ name: 'prestador-dashboard' })
  }
})

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const verificarStatus = async () => {
  verificando.value = true

  try {
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Aqui você faria a chamada real para verificar o status
    // const response = await fetch('/api/verificar-status')
    // const data = await response.json()
    // statusVerificacao.value = data.status

    alert('Status atualizado! Ainda em análise.')
  } catch (error) {
    alert('Erro ao verificar status. Tente novamente.')
  } finally {
    verificando.value = false
  }
}

const tentarNovamente = () => {
  router.push({ name: 'cadastro-prestador' })
}

const entrarContato = () => {
  window.location.href = 'mailto:suporte@iserv.com?subject=Dúvida sobre verificação'
}
</script>
