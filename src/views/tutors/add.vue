<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
    <legend class="fieldset-legend">Adicionando Tutores</legend>

    <label class="label">Nome completo</label>
    <input
      type="text"
      class="input w-full"
      v-model="form.nomeCompleto"
      placeholder="Nome completo"
    />

    <label class="label">CEP</label>
    <input type="text" class="input w-full" v-model="form.endereco.cep" placeholder="CEP" />

    <label class="label">Bairro</label>
    <input type="text" class="input w-full" v-model="form.endereco.bairro" placeholder="Bairro" />

    <label class="label">Número</label>
    <input type="text" class="input w-full" v-model="form.endereco.numero" placeholder="Número" />

    <label class="label">Logradouro</label>
    <input
      type="text"
      class="input w-full"
      v-model="form.endereco.logradouro"
      placeholder="Logradouro"
    />

    <label class="label">Cidade</label>
    <input type="text" class="input w-full" v-model="form.endereco.cidade" placeholder="Cidade" />

    <label class="label">Estado</label>
    <input type="text" class="input w-full" v-model="form.endereco.estado" placeholder="Estado" />

    <button class="btn btn-neutral mt-4" @click="adicionarTutor">Adicionar</button>
  </fieldset>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import Localbase from "localbase";

let db = null;

onMounted(() => {
  db = new Localbase("clinica-veterinaria");
});

const form = reactive({
  nomeCompleto: null,
  endereco: {
    cep: null,
    bairro: null,
    numero: null,
    logradouro: null,
    cidade: null,
    estado: null,
  },
});

function adicionarTutor() {
  db.collection("tutores").add({
    nome: form.nomeCompleto,
    endereco: {
      cep: form.endereco.cep,
      bairro: form.endereco.bairro,
      numero: form.endereco.numero,
      logradouro: form.endereco.logradouro,
      cidade: form.endereco.cidade,
      estado: form.endereco.estado,
    },
  });
}
</script>

<style lang="scss" scoped></style>
