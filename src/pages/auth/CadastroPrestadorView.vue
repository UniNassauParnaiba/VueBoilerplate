<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Cabeçalho -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block mb-4">
          <h1 class="text-4xl font-bold text-gray-900">iServ</h1>
        </router-link>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Cadastro de Prestador</h2>
        <p class="text-gray-600">Crie seu perfil profissional e comece a receber solicitações</p>
      </div>

      <!-- Formulário -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Progresso -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Etapa {{ step }} de 6</span>
              <span class="text-sm text-gray-500">{{ Math.round((step / 6) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gray-900 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(step / 6) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Etapa 1: Tipo de Prestador -->
          <div v-show="step === 1" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Tipo de Cadastro</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Pessoa Física -->
              <button
                type="button"
                @click="form.tipoPrestador = 'PF'"
                :class="[
                  'border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg text-left',
                  form.tipoPrestador === 'PF'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <div class="flex flex-col">
                  <div class="flex items-center justify-between mb-3">
                    <svg class="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div v-if="form.tipoPrestador === 'PF'" class="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">Pessoa Física</h4>
                  <p class="text-sm text-gray-600">Prestador individual com CPF</p>
                </div>
              </button>

              <!-- Pessoa Jurídica -->
              <button
                type="button"
                @click="form.tipoPrestador = 'PJ'"
                :class="[
                  'border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg text-left',
                  form.tipoPrestador === 'PJ'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <div class="flex flex-col">
                  <div class="flex items-center justify-between mb-3">
                    <svg class="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div v-if="form.tipoPrestador === 'PJ'" class="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">Pessoa Jurídica</h4>
                  <p class="text-sm text-gray-600">Empresa com CNPJ</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Etapa 2: Dados Pessoais ou Empresariais -->
          <div v-show="step === 2" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ form.tipoPrestador === 'PF' ? 'Dados Pessoais' : 'Dados da Empresa' }}
            </h3>

            <!-- Formulário Pessoa Física -->
            <template v-if="form.tipoPrestador === 'PF'">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                <input
                  v-model="form.nome"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                  <input
                    v-model="form.cpf"
                    type="text"
                    required
                    maxlength="14"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="000.000.000-00"
                    @input="formatCPF"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">RG *</label>
                  <input
                    v-model="form.rg"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="00.000.000-0"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
                <input
                  v-model="form.dataNascimento"
                  type="date"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Telefone/WhatsApp *</label>
                <input
                  v-model="form.telefone"
                  type="tel"
                  required
                  maxlength="15"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                  @input="formatPhone"
                />
              </div>
            </template>

            <!-- Formulário Pessoa Jurídica -->
            <template v-if="form.tipoPrestador === 'PJ'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Razão Social *</label>
                  <input
                    v-model="form.razaoSocial"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Nome da empresa"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nome Fantasia</label>
                  <input
                    v-model="form.nomeFantasia"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Nome comercial"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                  <input
                    v-model="form.cnpj"
                    type="text"
                    required
                    maxlength="18"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="00.000.000/0000-00"
                    @input="formatCNPJ"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Inscrição Estadual</label>
                  <input
                    v-model="form.inscricaoEstadual"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="000.000.000.000"
                  />
                </div>
              </div>

              <div class="border-t border-gray-200 pt-4 mt-4">
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Responsável Legal</h4>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Responsável *</label>
                  <input
                    v-model="form.nomeResponsavel"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Nome completo"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CPF do Responsável *</label>
                  <input
                    v-model="form.cpfResponsavel"
                    type="text"
                    required
                    maxlength="14"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="000.000.000-00"
                    @input="formatCPFResponsavel"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Telefone/WhatsApp *</label>
                <input
                  v-model="form.telefone"
                  type="tel"
                  required
                  maxlength="15"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                  @input="formatPhone"
                />
              </div>
            </template>
          </div>

          <!-- Etapa 3: Serviços -->
          <div v-show="step === 3" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Serviços Oferecidos</h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Categoria Principal *</label>
              <select
                v-model="form.categoriaPrincipal"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Construção Civil">Construção Civil</option>
                <option value="Reparos e Manutenção">Reparos e Manutenção</option>
                <option value="Eletricista">Eletricista</option>
                <option value="Encanador">Encanador</option>
                <option value="Pintura">Pintura</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Jardinagem">Jardinagem</option>
                <option value="Culinária">Culinária</option>
                <option value="Beleza e Estética">Beleza e Estética</option>
                <option value="Educação">Educação</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tempo de Experiência *</label>
              <select
                v-model="form.experiencia"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">Selecione</option>
                <option value="Menos de 1 ano">Menos de 1 ano</option>
                <option value="1-3 anos">1-3 anos</option>
                <option value="3-5 anos">3-5 anos</option>
                <option value="5-10 anos">5-10 anos</option>
                <option value="Mais de 10 anos">Mais de 10 anos</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Descrição dos Serviços *</label>
              <textarea
                v-model="form.descricao"
                required
                rows="4"
                maxlength="500"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Descreva os serviços que você oferece, suas especialidades e diferenciais..."
              ></textarea>
              <p class="text-sm text-gray-500 mt-1">{{ form.descricao.length }}/500 caracteres</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preço Médio por Hora *</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                <input
                  v-model="form.precoHora"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          <!-- Etapa 4: Endereço -->
          <div v-show="step === 4" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Área de Atendimento</h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
              <input
                v-model="form.cep"
                type="text"
                required
                maxlength="9"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="00000-000"
                @input="formatCEP"
                @blur="buscarCEP"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                <input
                  v-model="form.cidade"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Cidade"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                <select
                  v-model="form.estado"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">UF</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
              <input
                v-model="form.bairro"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Bairro"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Raio de Atendimento (km) *</label>
              <input
                v-model="form.raioAtendimento"
                type="number"
                required
                min="1"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Ex: 10"
              />
              <p class="text-sm text-gray-500 mt-1">Distância máxima que você atende a partir do seu endereço</p>
            </div>
          </div>

          <!-- Etapa 5: Upload de Documentos -->
          <div v-show="step === 5" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Documentação</h3>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-semibold mb-1">Documentos Necessários</p>
                  <p>Envie documentos legíveis em formato PDF, JPG ou PNG. Tamanho máximo: 5MB por arquivo.</p>
                </div>
              </div>
            </div>

            <!-- Documentos PF -->
            <template v-if="form.tipoPrestador === 'PF'">
              <div class="space-y-3">
                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">CPF (frente e verso) *</label>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docCPF')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docCPF" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">RG (frente e verso) *</label>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docRG')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docRG" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Comprovante de Residência *</label>
                  <p class="text-xs text-gray-500 mb-2">Conta de luz, água ou telefone (máx. 3 meses)</p>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docComprovante')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docComprovante" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Certificados/Qualificações</label>
                  <p class="text-xs text-gray-500 mb-2">Cursos, diplomas ou certificações (opcional)</p>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docCertificados')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docCertificados" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>
              </div>
            </template>

            <!-- Documentos PJ -->
            <template v-if="form.tipoPrestador === 'PJ'">
              <div class="space-y-3">
                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Cartão CNPJ *</label>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docCNPJ')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docCNPJ" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Contrato Social *</label>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docContratoSocial')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docContratoSocial" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Comprovante de Endereço da Empresa *</label>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docComprovanteEmpresa')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docComprovanteEmpresa" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">CPF do Responsável Legal *</label>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docCPFResponsavel')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docCPFResponsavel" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">RG do Responsável Legal *</label>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docRGResponsavel')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docRGResponsavel" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Certificações da Empresa</label>
                  <p class="text-xs text-gray-500 mb-2">Certificados, alvarás ou licenças (opcional)</p>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'docCertificadosEmpresa')"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                  />
                  <p v-if="form.documentos.docCertificadosEmpresa" class="text-sm text-green-600 mt-1">✓ Arquivo carregado</p>
                </div>
              </div>
            </template>
          </div>

          <!-- Etapa 6: Credenciais -->
          <div v-show="step === 6" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Dados de Acesso</h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Senha *</label>
              <input
                v-model="form.senha"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha *</label>
              <input
                v-model="form.confirmarSenha"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Digite a senha novamente"
              />
              <p v-if="form.senha && form.confirmarSenha && form.senha !== form.confirmarSenha" class="text-red-600 text-sm mt-1">
                As senhas não coincidem
              </p>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-semibold mb-1">Verificação de Perfil</p>
                  <p>Após o cadastro, sua conta passará por uma verificação de documentos. Isso garante mais segurança para você e seus clientes. Você receberá um email quando for aprovado.</p>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <label class="flex items-start gap-2">
                <input
                  v-model="form.aceitarTermos"
                  type="checkbox"
                  required
                  class="w-4 h-4 mt-1 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <span class="text-sm text-gray-600">
                  Eu li e aceito os
                  <a href="#" class="text-gray-900 underline">Termos de Uso</a>,
                  <a href="#" class="text-gray-900 underline">Política de Privacidade</a> e
                  <a href="#" class="text-gray-900 underline">Termos para Prestadores</a>
                </span>
              </label>
            </div>
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Botões de navegação -->
          <div class="flex gap-4 pt-4">
            <button
              v-if="step > 1"
              type="button"
              @click="step--"
              class="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Voltar
            </button>

            <button
              v-if="step < 6"
              type="button"
              @click="nextStep"
              :disabled="!canProceedToNextStep"
              class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Próximo
            </button>

            <button
              v-if="step === 6"
              type="submit"
              :disabled="loading || !isFormValid"
              class="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">Finalizar Cadastro</span>
              <span v-else>Cadastrando...</span>
            </button>
          </div>
        </form>

        <!-- Link para Login -->
        <div class="text-center mt-6 pt-6 border-t border-gray-200">
          <p class="text-gray-600">
            Já tem uma conta?
            <router-link to="/login" class="text-gray-900 font-semibold hover:underline ml-1">
              Fazer Login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const step = ref(1)
const loading = ref(false)
const error = ref('')

const form = ref({
  // Tipo de prestador
  tipoPrestador: null, // 'PF' ou 'PJ'

  // Dados PF
  nome: '',
  cpf: '',
  rg: '',
  dataNascimento: '',

  // Dados PJ
  razaoSocial: '',
  nomeFantasia: '',
  cnpj: '',
  inscricaoEstadual: '',
  nomeResponsavel: '',
  cpfResponsavel: '',

  // Comuns
  telefone: '',

  // Serviços
  categoriaPrincipal: '',
  experiencia: '',
  descricao: '',
  precoHora: '',

  // Endereço
  cep: '',
  cidade: '',
  estado: '',
  bairro: '',
  raioAtendimento: '',

  // Credenciais
  email: '',
  senha: '',
  confirmarSenha: '',
  aceitarTermos: false,

  // Documentos
  documentos: {
    // PF
    docCPF: null,
    docRG: null,
    docComprovante: null,
    docCertificados: null,
    // PJ
    docCNPJ: null,
    docContratoSocial: null,
    docComprovanteEmpresa: null,
    docCPFResponsavel: null,
    docRGResponsavel: null,
    docCertificadosEmpresa: null,
  }
})

const canProceedToNextStep = computed(() => {
  switch (step.value) {
    case 1:
      return form.value.tipoPrestador !== null
    case 2:
      if (form.value.tipoPrestador === 'PF') {
        return form.value.nome && form.value.cpf && form.value.rg &&
          form.value.dataNascimento && form.value.telefone
      } else {
        return form.value.razaoSocial && form.value.cnpj &&
          form.value.nomeResponsavel && form.value.cpfResponsavel &&
          form.value.telefone
      }
    case 3:
      return form.value.categoriaPrincipal && form.value.experiencia &&
        form.value.descricao && form.value.precoHora
    case 4:
      return form.value.cep && form.value.cidade && form.value.estado &&
        form.value.bairro && form.value.raioAtendimento
    case 5:
      if (form.value.tipoPrestador === 'PF') {
        return form.value.documentos.docCPF && form.value.documentos.docRG &&
          form.value.documentos.docComprovante
      } else {
        return form.value.documentos.docCNPJ && form.value.documentos.docContratoSocial &&
          form.value.documentos.docComprovanteEmpresa &&
          form.value.documentos.docCPFResponsavel &&
          form.value.documentos.docRGResponsavel
      }
    default:
      return true
  }
})

const isFormValid = computed(() => {
  return form.value.senha === form.value.confirmarSenha &&
    form.value.aceitarTermos &&
    form.value.senha.length >= 6 &&
    form.value.email
})

const nextStep = () => {
  if (step.value < 6 && canProceedToNextStep.value) {
    step.value++
  }
}

const formatPhone = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    form.value.telefone = value
  }
}

const formatCPF = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    form.value.cpf = value
  }
}

const formatCPFResponsavel = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    form.value.cpfResponsavel = value
  }
}

const formatCNPJ = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length <= 14) {
    value = value.replace(/^(\d{2})(\d)/, '$1.$2')
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
    form.value.cnpj = value
  }
}

const formatCEP = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length <= 8) {
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    form.value.cep = value
  }
}

const buscarCEP = async () => {
  const cep = form.value.cep.replace(/\D/g, '')
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (!data.erro) {
        form.value.cidade = data.localidade
        form.value.estado = data.uf
        form.value.bairro = data.bairro
      }
    } catch (err) {
      console.error('Erro ao buscar CEP:', err)
    }
  }
}

const handleFileUpload = (event, docType) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'Arquivo muito grande! Tamanho máximo: 5MB'
      event.target.value = ''
      return
    }
    // Validar tipo
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!validTypes.includes(file.type)) {
      error.value = 'Formato inválido! Use PDF, JPG ou PNG'
      event.target.value = ''
      return
    }

    form.value.documentos[docType] = file
    error.value = ''
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = 'Por favor, preencha todos os campos corretamente'
    return
  }

  loading.value = true
  error.value = ''

  try {
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))

    const user = {
      id: Date.now(),
      tipoPrestador: form.value.tipoPrestador,
      nome: form.value.tipoPrestador === 'PF' ? form.value.nome : form.value.razaoSocial,
      nomeFantasia: form.value.nomeFantasia,
      documento: form.value.tipoPrestador === 'PF' ? form.value.cpf : form.value.cnpj,
      rg: form.value.rg,
      dataNascimento: form.value.dataNascimento,
      nomeResponsavel: form.value.nomeResponsavel,
      cpfResponsavel: form.value.cpfResponsavel,
      inscricaoEstadual: form.value.inscricaoEstadual,
      email: form.value.email,
      telefone: form.value.telefone,
      categoria: form.value.categoriaPrincipal,
      experiencia: form.value.experiencia,
      descricao: form.value.descricao,
      precoHora: form.value.precoHora,
      endereco: {
        cep: form.value.cep,
        cidade: form.value.cidade,
        estado: form.value.estado,
        bairro: form.value.bairro,
        raioAtendimento: form.value.raioAtendimento
      },
      role: 'prestador',
      verificado: false, // Aguardando verificação de documentos
      statusVerificacao: 'pendente', // pendente, aprovado, recusado
      rating: 0,
      totalAvaliacoes: 0,
      dataCadastro: new Date().toISOString(),
      documentosEnviados: true
    }

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userRole', 'prestador')
    localStorage.setItem('isAuthenticated', 'true')

    // Redirecionar para página de verificação pendente
    router.push({ name: 'verificacao-pendente' })
  } catch (err) {
    error.value = 'Erro ao realizar cadastro. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
