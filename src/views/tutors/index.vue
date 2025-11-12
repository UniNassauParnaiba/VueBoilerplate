<template>
  <div class="mb-2">
    <breadcrumbs>
      <template v-slot:model> Tutores </template>
      <template v-slot:action> Lista de Tutores </template>
    </breadcrumbs>
  </div>
  <div class="card w-full bg-base-100 shadow-sm card-border">
    <div class="card-body">
      <div class="overflow-x-auto">
        <div class="flex">
          <div class="flex-1 mb-5 text-2xl">Tutores</div>
          <button class="btn btn-second" @click="adicionar">Adicionar</button>
        </div>
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="tutor in tutores" :key="tutor.data.id">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ tutor.data.nome }}</div>
                    <div class="text-sm opacity-50">
                      {{ tutor.data.endereco.cidade ?? "Cliente sem cidade" }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {{ tutor.data.endereco.logradouro }} {{ tutor.data.endereco.numero ?? "S/N" }}
                {{ tutor.data.endereco.cep }} {{ tutor.data.endereco.complemento }}
                <br />
                <span class="badge badge-ghost badge-sm"
                  >{{ tutor.data.endereco.cidade }}/{{ tutor.data.endereco.estado }}</span
                >
              </td>
              <td>
                <div
                  v-for="telefone in tutor.data.telefones"
                  :key="telefone"
                  class="badge badge-xs badge-dash flex m-1"
                >
                  {{ telefone }}
                </div>
              </td>
              <th>
                <router-link
                  class="btn btn-info btn-xs"
                  :to="{ name: 'tutors.edit', params: { id: tutor.key } }"
                  >Editar</router-link
                >
              </th>
            </tr>
          </tbody>
          <!-- foot -->
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import DBService from "@/services/DBService";
import TutorsController from "@/controller/TutorsController";

onMounted(() => {
  capturarTutores();
});

const tutores = ref([]);

const capturarTutores = async () => {
  let dados = await TutorsController.listarTutores();
  tutores.value = dados;
};

const router = useRouter();

const adicionar = () => {
  router.push({ name: "tutors.add" });
};
</script>

<style lang="scss" scoped></style>
