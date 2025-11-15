<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import db from './db.js'

const router = useRouter()

const mode = ref('login') 

const email = ref('')
const password = ref('')

async function handleRegister() {
  try {
    const id = await db.users.add({
      email: email.value,
      password: password.value 
    })

    alert(`Usuário registrado com sucesso! ID: ${id}`)
    email.value = ''
    password.value = ''
    mode.value = 'login'
  } catch (error) {
    console.error(error)
    alert('Erro ao registrar: Este e-mail já pode estar em uso.')
  }
}

async function handleLogin() {
  try {
    const user = await db.users.where('email').equals(email.value).first()

    if (user && user.password === password.value) {
      alert('Login efetuado com sucesso!')
      sessionStorage.setItem('loggedInUser', user.email)
      router.push('/')
    } else {
      alert('E-mail ou senha inválidos.')
    }
  } catch (error) {
    console.error(error)
    alert('Erro ao tentar fazer login.')
  }
}

function handleSubmit() {
  if (mode.value === 'login') {
    handleLogin()
  } else {
    handleRegister()
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Easy Kamban</h2>
      
      <form @submit.prevent="handleSubmit">
        <h3>{{ mode === 'login' ? 'Login' : 'Registro' }}</h3>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        
        <button type="submit" class="btn-submit">
          {{ mode === 'login' ? 'Entrar' : 'Registrar' }}
        </button>
      </form>
      
      <button @click="mode = (mode === 'login' ? 'register' : 'login')" class="btn-toggle">
        {{ mode === 'login' ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-container {
  background: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  color: #172b4d;
  margin-bottom: 1.5rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #0079bf;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #005a8d;
}

.btn-toggle {
  background: none;
  border: none;
  color: #0079bf;
  cursor: pointer;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}
</style>