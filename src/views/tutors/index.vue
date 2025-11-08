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
            <tr v-for="item in tutores" :key="item.data.nome">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center gap-3">
                  <span class="status status-success"></span>
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ item.data?.nome }}</div>
                    <div class="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </td>
              <td>Purple</td>
              <th>
                <router-link
                  class="btn btn-info btn-xs"
                  :to="{ name: 'tutors.edit', params: { id: item.key } }"
                  >editar</router-link
                >
                <a href="#my_modal_1" class="btn btn-error btn-xs"> Deletar </a>
                <div class="modal" role="dialog" id="my_modal_1">
                  <div class="modal-box">
                    <h3 class="text-lg font-bold">Você está preste a deletar um item.</h3>
                    <p class="py-4">Tem certeza que deseja deletar esse item?</p>
                    <div class="modal-action">
                      <a href="#" class="btn">Não</a>
                      <a href="#" class="btn btn-info">Sim</a>
                    </div>
                  </div>
                </div>
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
import DBService from "@/services/DBService";
import { onMounted, ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dialog = useTemplateRef("my_modal_1");

onMounted(async () => {
  capturarTutores();
});

const tutores = ref([]);

const adicionar = () => {
  router.push({ name: "tutors.add" });
};

const capturarTutores = async () => {
  tutores.value = await DBService.listar("tutores");
};

function manipularModal() {
  dialog.showModal();
}
</script>

<style lang="scss" scoped></style>
