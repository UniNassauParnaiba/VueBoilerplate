<template>
  <div>
    <breadcrumbs>
      <template v-slot:model> Tutores </template>
      <template v-slot:action> Editando Tutores </template>
    </breadcrumbs>
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

      <button class="btn btn-neutral mt-4" @click="atualizarTutor">Editar</button>
    </fieldset>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import DBService from "@/services/DBService";
import Localbase from "localbase";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
let db = null;

onMounted(() => {
  db = new Localbase("clinica-veterinaria");
  capturarTutores();
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

function capturarTutores() {
  DBService.capturarDocumento("tutores", route.params.id).then((document) => {
    form.nomeCompleto = document.nome;
    form.endereco.bairro = document.endereco.bairro;
    form.endereco.cep = document.endereco.cep;
    form.endereco.numero = document.endereco.numero;
    form.endereco.logradouro = document.endereco.logradouro;
    form.endereco.cidade = document.endereco.cidade;
    form.endereco.estado = document.endereco.estado;
  });
}

function atualizarTutor() {
  try {
    DBService.atualizar("tutores", route.params.id, {
      nome: form.nomeCompleto,
      endereco: {
        bairro: form.endereco.bairro,
        cep: form.endereco.cep,
        numero: form.endereco.numero,
        numero: form.endereco.numero,
        logradouro: form.endereco.logradouro,
        cidade: form.endereco.cidade,
        estado: form.endereco.estado,
      },
    });
    router.push({ name: "tutors.index" });
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped></style>
