<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-5xl w-full">
      <!-- Cabeçalho -->
      <div class="text-center mb-12">
        <router-link to="/" class="inline-block mb-4">
          <h1 class="text-4xl font-bold text-gray-900">iServ</h1>
        </router-link>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Como você quer usar o iServ?</h2>
        <p class="text-gray-600">Escolha o tipo de conta que melhor se adequa a você</p>
      </div>

      <!-- Cards de Escolha -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Card Cliente -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-gray-900 cursor-pointer group">
          <div class="text-center space-y-6">
            <!-- Ícone -->
            <div class="w-24 h-24 bg-gray-100 group-hover:bg-gray-900 rounded-full flex items-center justify-center mx-auto transition-colors">
              <svg class="w-12 h-12 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Título -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Sou Cliente</h3>
              <p class="text-gray-600">Quero contratar serviços</p>
            </div>

            <!-- Benefícios -->
            <ul class="text-left space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Encontre profissionais qualificados
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Compare preços e avaliações
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Solicite orçamentos gratuitos
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Histórico de serviços contratados
              </li>
            </ul>

            <!-- Botão -->
            <router-link
              to="/cadastro/cliente"
              class="block w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Cadastrar como Cliente
            </router-link>
          </div>
        </div>

        <!-- Card Prestador -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-gray-900 cursor-pointer group">
          <div class="text-center space-y-6">
            <!-- Ícone -->
            <div class="w-24 h-24 bg-gray-100 group-hover:bg-gray-900 rounded-full flex items-center justify-center mx-auto transition-colors">
              <svg class="w-12 h-12 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <!-- Título -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Sou Prestador</h3>
              <p class="text-gray-600">Quero oferecer meus serviços</p>
            </div>

            <!-- Benefícios -->
            <ul class="text-left space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Receba solicitações de clientes
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Divulgue seu trabalho
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Construa sua reputação online
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Gerencie seus serviços
              </li>
            </ul>

            <!-- Botão -->
            <router-link
              to="/cadastro/prestador"
              class="block w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Cadastrar como Prestador
            </router-link>
          </div>
        </div>
      </div>

      <!-- Link para Login -->
      <div class="text-center mt-8">
        <p class="text-gray-600">
          Já tem uma conta?
          <router-link to="/login" class="text-gray-900 font-semibold hover:underline ml-1">
            Fazer Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
