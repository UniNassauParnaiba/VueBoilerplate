// src/services/userService.js

/**
 * Serviço para gerenciar usuários do sistema
 * Armazena clientes e prestadores separadamente
 */

// Chaves do localStorage
const STORAGE_KEYS = {
  CLIENTES: 'iServ_clientes',
  PRESTADORES: 'iServ_prestadores',
  CURRENT_USER: 'user',
  USER_ROLE: 'userRole',
  IS_AUTHENTICATED: 'isAuthenticated'
}

// ========== FUNÇÕES DE CLIENTES ==========

/**
 * Buscar todos os clientes
 */
export function getAllClientes() {
  const clientes = localStorage.getItem(STORAGE_KEYS.CLIENTES)
  return clientes ? JSON.parse(clientes) : []
}

/**
 * Adicionar novo cliente
 */
export function addCliente(cliente) {
  const clientes = getAllClientes()

  // Verificar se email já existe
  if (clientes.some(c => c.email === cliente.email)) {
    throw new Error('Este email já está cadastrado')
  }

  // Adicionar ID e data de cadastro
  const novoCliente = {
    ...cliente,
    id: Date.now(),
    role: 'cliente',
    dataCadastro: new Date().toISOString(),
    ativo: true
  }

  clientes.push(novoCliente)
  localStorage.setItem(STORAGE_KEYS.CLIENTES, JSON.stringify(clientes))

  return novoCliente
}

/**
 * Buscar cliente por ID
 */
export function getClienteById(id) {
  const clientes = getAllClientes()
  return clientes.find(c => c.id === id)
}

/**
 * Buscar cliente por email
 */
export function getClienteByEmail(email) {
  const clientes = getAllClientes()
  return clientes.find(c => c.email === email)
}

/**
 * Atualizar cliente
 */
export function updateCliente(id, dadosAtualizados) {
  const clientes = getAllClientes()
  const index = clientes.findIndex(c => c.id === id)

  if (index === -1) {
    throw new Error('Cliente não encontrado')
  }

  clientes[index] = { ...clientes[index], ...dadosAtualizados }
  localStorage.setItem(STORAGE_KEYS.CLIENTES, JSON.stringify(clientes))

  return clientes[index]
}

/**
 * Excluir cliente
 */
export function deleteCliente(id) {
  const clientes = getAllClientes()
  const clientesFiltrados = clientes.filter(c => c.id !== id)

  localStorage.setItem(STORAGE_KEYS.CLIENTES, JSON.stringify(clientesFiltrados))

  return true
}

// ========== FUNÇÕES DE PRESTADORES ==========

/**
 * Buscar todos os prestadores
 */
export function getAllPrestadores() {
  const prestadores = localStorage.getItem(STORAGE_KEYS.PRESTADORES)
  return prestadores ? JSON.parse(prestadores) : []
}

/**
 * Adicionar novo prestador
 */
export function addPrestador(prestador) {
  const prestadores = getAllPrestadores()

  // Verificar se email já existe
  if (prestadores.some(p => p.email === prestador.email)) {
    throw new Error('Este email já está cadastrado')
  }

  // Verificar se documento já existe
  const documento = prestador.cpf || prestador.cnpj
  if (prestadores.some(p => (p.cpf === documento || p.cnpj === documento))) {
    throw new Error('Este documento já está cadastrado')
  }

  // Adicionar ID, role e status
  const novoPrestador = {
    ...prestador,
    id: Date.now(),
    role: 'prestador',
    dataCadastro: new Date().toISOString(),
    verificado: false,
    statusVerificacao: 'pendente',
    ativo: true,
    rating: 0,
    totalAvaliacoes: 0
  }

  prestadores.push(novoPrestador)
  localStorage.setItem(STORAGE_KEYS.PRESTADORES, JSON.stringify(prestadores))

  return novoPrestador
}

/**
 * Buscar prestador por ID
 */
export function getPrestadorById(id) {
  const prestadores = getAllPrestadores()
  return prestadores.find(p => p.id === id)
}

/**
 * Buscar prestador por email
 */
export function getPrestadorByEmail(email) {
  const prestadores = getAllPrestadores()
  return prestadores.find(p => p.email === email)
}

/**
 * Atualizar prestador
 */
export function updatePrestador(id, dadosAtualizados) {
  const prestadores = getAllPrestadores()
  const index = prestadores.findIndex(p => p.id === id)

  if (index === -1) {
    throw new Error('Prestador não encontrado')
  }

  prestadores[index] = { ...prestadores[index], ...dadosAtualizados }
  localStorage.setItem(STORAGE_KEYS.PRESTADORES, JSON.stringify(prestadores))

  return prestadores[index]
}

/**
 * Excluir prestador
 */
export function deletePrestador(id) {
  const prestadores = getAllPrestadores()
  const prestadoresFiltrados = prestadores.filter(p => p.id !== id)

  localStorage.setItem(STORAGE_KEYS.PRESTADORES, JSON.stringify(prestadoresFiltrados))

  return true
}

/**
 * Aprovar prestador (verificação)
 */
export function aprovarPrestador(id) {
  return updatePrestador(id, {
    verificado: true,
    statusVerificacao: 'aprovado'
  })
}

/**
 * Recusar prestador
 */
export function recusarPrestador(id, motivo) {
  return updatePrestador(id, {
    verificado: false,
    statusVerificacao: 'recusado',
    motivoRecusa: motivo
  })
}

// ========== FUNÇÕES DE AUTENTICAÇÃO ==========

/**
 * Login de usuário
 */
export function loginUser(email, senha) {
  // Buscar em clientes
  const cliente = getClienteByEmail(email)
  if (cliente && cliente.senha === senha) {
    if (!cliente.ativo) {
      throw new Error('Conta desativada')
    }

    // Salvar sessão
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(cliente))
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, 'cliente')
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true')

    return { user: cliente, role: 'cliente' }
  }

  // Buscar em prestadores
  const prestador = getPrestadorByEmail(email)
  if (prestador && prestador.senha === senha) {
    if (!prestador.ativo) {
      throw new Error('Conta desativada')
    }

    // Salvar sessão
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(prestador))
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, 'prestador')
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true')

    return { user: prestador, role: 'prestador' }
  }

  throw new Error('Email ou senha incorretos')
}

/**
 * Logout de usuário
 */
export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  localStorage.removeItem(STORAGE_KEYS.USER_ROLE)
  localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED)
}

/**
 * Buscar usuário atual logado
 */
export function getCurrentUser() {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return user ? JSON.parse(user) : null
}

/**
 * Verificar se usuário está autenticado
 */
export function isAuthenticated() {
  return localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true'
}

/**
 * Buscar role do usuário atual
 */
export function getCurrentUserRole() {
  return localStorage.getItem(STORAGE_KEYS.USER_ROLE)
}

/**
 * Excluir conta do usuário logado
 */
export function deleteCurrentUserAccount() {
  const user = getCurrentUser()
  const role = getCurrentUserRole()

  if (!user) {
    throw new Error('Nenhum usuário logado')
  }

  if (role === 'cliente') {
    deleteCliente(user.id)
  } else if (role === 'prestador') {
    deletePrestador(user.id)
  }

  logoutUser()
  return true
}

// ========== FUNÇÕES AUXILIARES ==========

/**
 * Buscar todos os usuários (clientes + prestadores)
 */
export function getAllUsers() {
  return {
    clientes: getAllClientes(),
    prestadores: getAllPrestadores()
  }
}

/**
 * Contar total de usuários
 */
export function getTotalUsers() {
  return {
    clientes: getAllClientes().length,
    prestadores: getAllPrestadores().length,
    total: getAllClientes().length + getAllPrestadores().length
  }
}

/**
 * Buscar estatísticas
 */
export function getStatistics() {
  const prestadores = getAllPrestadores()
  const clientes = getAllClientes()

  return {
    totalClientes: clientes.length,
    totalPrestadores: prestadores.length,
    totalUsuarios: clientes.length + prestadores.length,
    prestadoresVerificados: prestadores.filter(p => p.verificado).length,
    prestadoresPendentes: prestadores.filter(p => p.statusVerificacao === 'pendente').length,
    clientesAtivos: clientes.filter(c => c.ativo).length,
    prestadoresAtivos: prestadores.filter(p => p.ativo).length
  }
}
