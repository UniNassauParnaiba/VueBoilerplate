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

            <tr v-for="item in tutores" :key="item.nomeCompleto">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center gap-3">
                  <span
                    class="status"
                    :class="{ 'status-success': item.status === 'online' }"
                  ></span>
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ item.nomeCompleto }}</div>
                    <div class="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                {{ item.endereco.logradouro }} - {{ item.endereco.bairro }}
                <br />
                <span class="badge badge-ghost badge-sm">{{ item.endereco.cep }}</span>
              </td>
              <td>Purple</td>
              <th>
                <router-link
                  class="btn btn-info btn-xs"
                  :to="{ name: 'tutors.edit', params: { id: item.id } }"
                  >editar</router-link
                >
                <a :href="`#my_modal_${item.id}`" class="btn btn-error btn-xs"> Deletar </a>
                <div class="modal" role="dialog" :id="`my_modal_${item.id}`">
                  <div class="modal-box">
                    <h3 class="text-lg font-bold">Você está preste a deletar um item.</h3>
                    <p class="py-4">Tem certeza que deseja deletar esse item?</p>
                    <div class="modal-action">
                      <a href="#" class="btn">Não</a>
                      <a href="#" class="btn btn-info" @click.prevent="deletarTutor(item.id)"
                        >Sim</a
                      >
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
import { useTutor } from "@/composables/useTutor";
import { useRouter } from "vue-router";

const router = useRouter();
const { capturarTutores, tutores, deletarTutor } = useTutor();

const adicionar = () => {
  router.push({ name: "tutors.add" });
};

// async function deletarTutor(id) {
//   await TutorsController.deletar(id);
//   await capturarTutores();
// }
</script>

<style lang="scss" scoped></style>
