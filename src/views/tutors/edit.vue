<template>
  <div>
    <breadcrumbs>
      <template v-slot:model> Tutores </template>
      <template v-slot:action> Editando Tutores </template>
    </breadcrumbs>
    <form @submit.prevent="manipularTutor(tutor)">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend class="fieldset-legend">Adicionando Tutores</legend>
        <label class="label">Nome completo</label>
        <input
          type="text"
          class="input w-full"
          v-model="tutor.nomeCompleto"
          placeholder="Nome completo"
        />

        <label class="label">CEP</label>
        <input type="text" class="input w-full" v-model="tutor.endereco.cep" placeholder="CEP" />

        <label class="label">Bairro</label>
        <input
          type="text"
          class="input w-full"
          v-model="tutor.endereco.bairro"
          placeholder="Bairro"
        />

        <label class="label">Número</label>
        <input
          type="text"
          class="input w-full"
          v-model="tutor.endereco.numero"
          placeholder="Número"
        />

        <label class="label">Logradouro</label>
        <input
          type="text"
          class="input w-full"
          v-model="tutor.endereco.logradouro"
          placeholder="Logradouro"
        />

        <label class="label">Cidade</label>
        <input
          type="text"
          class="input w-full"
          v-model="tutor.endereco.cidade"
          placeholder="Cidade"
        />

        <label class="label">Estado</label>
        <input
          type="text"
          class="input w-full"
          v-model="tutor.endereco.estado"
          placeholder="Estado"
        />

        <button class="btn btn-neutral mt-4" type="submit">Editar</button>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { useTutor } from "@/composables/useTutor";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { tutor, buscarPorId, manipularTutor } = useTutor();

console.table(tutor.value);

onMounted(() => {
  buscarPorId(route.params.id);
});
</script>

<style lang="scss" scoped></style>
