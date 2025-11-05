<template>
  <div class="w-full">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
      <legend class="fieldset-legend">Editando tutores</legend>

      <label class="label">Nome</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Nome completo"
        v-model="form.nomeCompleto"
      />

      <label class="label">Logradouro</label>
      <input type="text" class="input w-full" placeholder="Logradouro" v-model="form.logradouro" />

      <label class="label">Número</label>
      <input type="text" class="input w-full" placeholder="Número" v-model="form.numero" />

      <label class="label">Bairro</label>
      <input type="text" class="input w-full" placeholder="Bairro" v-model="form.bairro" />

      <label class="label">CEP</label>
      <input type="text" class="input w-full" placeholder="CEP" v-model="form.cep" />

      <label class="label">Complemento</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Complemento"
        v-model="form.complemento"
      />

      <label class="label">Cidade</label>
      <input type="text" class="input w-full" placeholder="Cidade" v-model="form.cidade" />

      <label class="label">Estado</label>
      <input type="text" class="input w-full" placeholder="Estado" v-model="form.estado" />

      <button class="btn btn-neutral mt-4" @click="adicionarTutor">Editar</button>
    </fieldset>
    <div class="toast" v-if="toastVisible">
      <div class="alert alert-info">
        <span
          ><strong>{{ nomeCompletoToast }}</strong> salvo com sucesso.</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import Localbase from "localbase";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const form = reactive({
  nomeCompleto: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cep: "",
  complemento: "",
  cidade: "",
  estado: "",
});
let db = null;

function capturarMeuTutor(id) {
  db.collection("tutores")
    .doc(id)
    .get()
    .then((document) => {
      form.nomeCompleto = document.nome;
      form.logradouro = document.endereco.logradouro;
      form.numero = document.endereco.numero;
      form.bairro = document.endereco.bairro;
      form.cep = document.endereco.cep;
      form.complemento = document.endereco.complemento;
      form.cidade = document.endereco.cidade;
      form.estado = document.endereco.estado;
    });
}

onMounted(() => {
  db = new Localbase("db");
  capturarMeuTutor(route.params.id);
});
</script>

<style lang="scss" scoped></style>
